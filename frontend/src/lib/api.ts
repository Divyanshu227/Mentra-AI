const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

export const fetchApi = async (url: string, options: RequestInit = {}): Promise<Response> => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  
  const headers = new Headers(options.headers || {});
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  
  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  const fetchOptions: RequestInit = {
    ...options,
    headers,
    credentials: 'include', // Important for sending/receiving HttpOnly cookies
  };

  const response = await fetch(`${BASE_URL}${url}`, fetchOptions);

  // Safely parse JSON to prevent "Unexpected token" crashes on server errors
  const originalJson = response.json.bind(response);
  response.json = async () => {
    const text = await response.clone().text();
    try {
      return JSON.parse(text);
    } catch (e) {
      return { error: text || 'A server error occurred' };
    }
  };

  if (response.status === 401 && !url.includes('/auth/login') && !url.includes('/auth/refresh')) {
    if (isRefreshing) {
      return new Promise(function(resolve, reject) {
        failedQueue.push({ resolve, reject });
      }).then(token => {
        headers.set('Authorization', `Bearer ${token}`);
        return fetch(`${BASE_URL}${url}`, { ...fetchOptions, headers }).then(res => {
           const origJson = res.json.bind(res);
           res.json = async () => {
             const t = await res.clone().text();
             try { return JSON.parse(t); } catch(e) { return { error: t || 'A server error occurred' }; }
           };
           return res;
        });
      }).catch(err => {
        return Promise.reject(err);
      });
    }

    isRefreshing = true;

    try {
      const refreshRes = await fetch(`${BASE_URL}/api/auth/refresh`, {
        method: 'POST',
        credentials: 'include'
      });

      if (!refreshRes.ok) {
        throw new Error('Refresh failed');
      }

      const refreshData = await refreshRes.json();
      localStorage.setItem('accessToken', refreshData.accessToken);
      
      processQueue(null, refreshData.accessToken);
      
      // Retry original request
      headers.set('Authorization', `Bearer ${refreshData.accessToken}`);
      const retryResponse = await fetch(`${BASE_URL}${url}`, { ...fetchOptions, headers });
      retryResponse.json = async () => {
        const text = await retryResponse.clone().text();
        try {
          return JSON.parse(text);
        } catch (e) {
          return { error: text || 'A server error occurred' };
        }
      };
      return retryResponse;
    } catch (err) {
      processQueue(err, null);
      localStorage.removeItem('accessToken');
      if (typeof window !== 'undefined') {
        const protectedRoutes = ['/generate', '/quiz', '/history'];
        const isProtected = protectedRoutes.some(route => window.location.pathname.startsWith(route));
        if (isProtected) {
          window.location.href = '/login';
        }
      }
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  }

  return response;
};

