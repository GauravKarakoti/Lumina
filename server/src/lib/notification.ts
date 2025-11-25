import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const sendNotification = async (userId: number, message: string) => {
  try {
    await prisma.notification.create({
      data: { userId, message },
    });
  } catch (error) {
    console.error("Failed to send notification:", error);
  }
};