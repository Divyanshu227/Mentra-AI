# Mentra-AI

Mentra-AI is an intelligent, AI-powered quiz generation platform. It allows users to automatically create dynamic quizzes from simple text prompts or by uploading documents (such as images or PDFs). 

Leveraging the power of Google's Generative AI (Gemini) and modern web technologies, Mentra-AI provides a seamless and engaging experience for both creating and taking quizzes.

## 🚀 Features

- **AI Quiz Generation**: Automatically generate comprehensive quizzes complete with questions, multiple-choice options, correct answers, and explanations.
- **Multi-Modal Input**: Create quizzes from simple text prompts or by uploading context files (images, PDFs).
- **Modern User Interface**: A highly responsive, interactive, and beautiful frontend built with Next.js, Tailwind CSS, and Framer Motion.
- **Robust Backend**: A scalable backend built with Express.js, TypeScript, and Prisma ORM.
- **Database Integration**: Securely store and retrieve quizzes using PostgreSQL.

## 🛠️ Technology Stack

### Frontend
- **Framework**: [Next.js](https://nextjs.org/) (React)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Language**: TypeScript

### Backend
- **Framework**: [Express.js](https://expressjs.com/)
- **Language**: TypeScript
- **Database ORM**: [Prisma](https://www.prisma.io/)
- **Database**: PostgreSQL
- **AI Integration**: [@google/generative-ai](https://www.npmjs.com/package/@google/generative-ai) (Gemini 2.5 Flash)
- **File Handling**: Multer

## 📦 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- PostgreSQL database
- Google Gemini API Key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Mentra-AI
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```
   - Create a `.env` file in the `backend` directory with the following variables:
     ```env
     DATABASE_URL="postgresql://user:password@localhost:5432/mentra_db?schema=public"
     GEMINI_API_KEY="your_google_gemini_api_key"
     ```
   - Run database migrations:
     ```bash
     npx prisma db push
     ```
   - Start the backend development server:
     ```bash
     npm run dev
     ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```
   - Create a `.env.local` file in the `frontend` directory if you have any environment variables (like backend API URL).
   - Start the frontend development server:
     ```bash
     npm run dev
     ```

4. **Open the Application**
   - Frontend runs on `http://localhost:3000`
   - Backend API runs on `http://localhost:5000` (or as configured)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! 

## 📝 License

This project is licensed under the ISC License.
