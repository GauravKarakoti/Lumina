import { PrismaClient } from '@prisma/client';

// Reuse the existing instance if possible, or create a new one
const prisma = new PrismaClient();

export const sendNotification = async (userId: number, message: string, link?: string) => {
  try {
    await prisma.notification.create({
      data: { 
        userId, 
        message, 
        link,
        type: "INFO" 
      },
    });
  } catch (error) {
    console.error("Failed to send notification:", error);
  }
};

// --- ADD THIS NEW FUNCTION ---
export const broadcastNotification = async (message: string, link: string) => {
  try {
    // 1. Get all user IDs
    const users = await prisma.user.findMany({
      select: { id: true }
    });

    if (users.length === 0) return;

    // 2. Prepare data for bulk insertion
    const notifications = users.map(user => ({
      userId: user.id,
      message,
      link,
      type: "ALERT", // Using ALERT for announcements
      isRead: false
    }));

    // 3. Create notifications in a single database query
    await prisma.notification.createMany({
      data: notifications
    });

    console.log(`Broadcast sent to ${users.length} users: ${message}`);
  } catch (error) {
    console.error("Failed to broadcast notification:", error);
  }
};