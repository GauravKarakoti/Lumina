import Parser from 'rss-parser';
import cron from 'node-cron';
import { PrismaClient } from '@prisma/client';
import { broadcastNotification } from './notification.js';
import 'dotenv/config'

const parser = new Parser();
const prisma = new PrismaClient();

const CHANNEL_ID = process.env.CHANNEL_ID; 

export const startYouTubeWatcher = () => {
  console.log('🎥 YouTube Watcher Service Started...');

  // Schedule task to run every 30 minutes
  // Format: "*/30 * * * *"
  cron.schedule('*/30 * * * *', async () => {
    try {
      // Fetch the channel's RSS feed
      const feed = await parser.parseURL(`https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`);
      
      if (!feed.items || feed.items.length === 0) return;

      // Get the very latest video
      const latestVideo = feed.items[0];
      const videoLink = latestVideo?.link;
      const videoTitle = latestVideo?.title;

      if (!videoLink || !videoTitle) return;

      // CHECK: Have we already notified users about this specific link?
      // We check if *any* notification exists with this link.
      const existingNotification = await prisma.notification.findFirst({
        where: { link: videoLink }
      });

      if (!existingNotification) {
        console.log(`New video detected: ${videoTitle}`);
        
        await broadcastNotification(
          `New Video Uploaded: ${videoTitle}`, 
          videoLink
        );
      } 
    } catch (error) {
      console.error('Error checking YouTube feed:', error);
    }
  });
};