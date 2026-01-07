import { PrismaClient } from '@prisma/client';
import makeWASocket, { 
    useMultiFileAuthState, 
    DisconnectReason,
    fetchLatestBaileysVersion
} from '@whiskeysockets/baileys';
import { Boom } from '@hapi/boom';
import pino from 'pino';
import qrcode from 'qrcode-terminal'; // <--- Import this

const prisma = new PrismaClient();

// Global variable to store the socket connection
let sock: any;

// Initialize WhatsApp Client
export const initializeWhatsApp = async () => {
    const { state, saveCreds } = await useMultiFileAuthState('whatsapp-session');
    const { version } = await fetchLatestBaileysVersion();

    sock = makeWASocket({
        version,
        logger: pino({ level: 'silent' }), 
        auth: state,
        browser: ['Lumina', 'Chrome', '10.0'],
        generateHighQualityLinkPreview: true,
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', (update: any) => {
        const { connection, lastDisconnect, qr } = update;

        // 1. Handle QR Code manually
        if (qr) {
            console.log('SCAN THIS QR CODE WITH YOUR WHATSAPP:');
            qrcode.generate(qr, { small: true });
        }

        // 2. Handle Connection State
        if (connection === 'close') {
            const shouldReconnect = (lastDisconnect?.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log('❌ Connection closed due to ', lastDisconnect?.error, ', reconnecting ', shouldReconnect);
            
            if (shouldReconnect) {
                initializeWhatsApp();
            }
        } else if (connection === 'open') {
            console.log('✅ WhatsApp Client is ready!');
        }
    });
};

// Helper to send WhatsApp
export const sendWhatsappMessage = async (to: string, body: string, mediaUrl?: string) => {
    if (!sock) {
        console.log('⚠️ WhatsApp client not initialized yet. Skipping message.');
        return;
    }

    try {
        const sanitizedNumber = to.replace(/[^0-9]/g, '');
        const jid = `${sanitizedNumber}@s.whatsapp.net`;
        
        console.log(`Sending WhatsApp to ${to} (JID: ${jid})`);

        const [result] = await sock.onWhatsApp(jid);
        
        if (!result?.exists) {
            console.log(`⚠️ User ${to} is not registered on WhatsApp.`);
            return;
        }
        
        console.log(`User ${to} is registered on WhatsApp.`);

        await sock.sendMessage(jid, { 
            text: body 
        });
        
        console.log(`WhatsApp sent to ${to}`);
    } catch (error) {
        console.error(`Failed to send WhatsApp to ${to}:`, error);
    }
};

export const sendNotification = async (
  userId: number, 
  message: string, 
  link?: string, 
  imageUrl?: string
) => {
  try {
    await prisma.notification.create({
      data: { userId, message, link, imageUrl, type: "INFO" },
    });

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (user?.phoneNumber) {
      const whatsappBody = `${message}\n${link ? `Link: ${link}` : ''}`;
      await sendWhatsappMessage(user.phoneNumber, whatsappBody, imageUrl);
    }

  } catch (error) {
    console.error("Failed to send notification:", error);
  }
};

export const broadcastNotification = async (
  message: string, 
  link: string, 
  imageUrl?: string
) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, phoneNumber: true }
    });

    if (users.length === 0) return;

    const notifications = users.map(user => ({
      userId: user.id,
      message,
      link,
      imageUrl,
      type: "ALERT",
      isRead: false
    }));

    await prisma.notification.createMany({
      data: notifications
    });

    const whatsappBody = `📢 New Update: ${message}\nWatch here: ${link}`;
    
    for (const user of users) {
      if (user.phoneNumber) {
        await sendWhatsappMessage(user.phoneNumber, whatsappBody, imageUrl);
        await new Promise(r => setTimeout(r, 2000)); 
      }
    }

    console.log(`Broadcast sent to ${users.length} users.`);
  } catch (error) {
    console.error("Failed to broadcast notification:", error);
  }
};