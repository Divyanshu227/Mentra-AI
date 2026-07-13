import 'dotenv/config';
import { prisma } from './src/utils/prisma';

async function main() {
  const user = await prisma.user.findFirst();
  if (user) {
    const res = await prisma.quiz.updateMany({
      where: { userId: null },
      data: { userId: user.id }
    });
    console.log('Updated:', res.count);
  }
}
main();
