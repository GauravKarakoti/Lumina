import { Router } from 'express';
import prisma from '../db.js';
import bcrypt from 'bcryptjs';
import multer from 'multer';
import { sendVerificationEmail } from '../lib/email.js';
import multerS3 from 'multer-s3-v3';
import { s3, generateSignedUrl } from '../lib/s3Utils.js'; // Import utility

const router = Router();

// --- B2 & Multer Setup for Avatar Uploads ---
const upload = multer({ 
  storage: multerS3({
    s3: s3,
    bucket: process.env.B2_BUCKET_NAME!,
    // IMPORTANT: No 'acl: public-read' is needed, the bucket is private.
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req: any, file: any, cb: any) {
      const userId = (req as any).user.id;
      const fileExtension = file.originalname.split('.').pop();
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      // Save the KEY (path) for the avatar
      const s3Key = `avatars/user-${userId}-${uniqueSuffix}.${fileExtension}`;
      cb(null, s3Key);
    }
  }),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only images are allowed') as any, false);
    }
  }
});

// --- Helper function to sign the avatarUrl before returning to the client ---
async function signUserAvatar(user: any) {
  if (user?.avatarUrl && process.env.B2_BUCKET_NAME) {
    user.avatarUrl = await generateSignedUrl(user.avatarUrl, process.env.B2_BUCKET_NAME);
  }
  return user;
}


// --- Routes ---

// GET /api/user/me - Get current user details AND sign the avatar URL
router.get('/me', async (req: any, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, email: true, name: true, avatarUrl: true, role: true }
    });
    
    const signedUser = await signUserAvatar(user);

    res.json(signedUser);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile" });
  }
});

// PUT /api/user/profile - Update basic profile info (name)
router.put('/profile', async (req: any, res) => {
  const { name } = req.body;
  try {
    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: { name },
      select: { id: true, email: true, name: true, avatarUrl: true, role: true }
    });
    
    const signedUser = await signUserAvatar(updatedUser);

    res.json(signedUser);
  } catch (error) {
    res.status(500).json({ message: "Error updating profile" });
  }
});

// POST /api/user/avatar - Upload and update avatar
router.post('/avatar', upload.single('avatar'), async (req: any, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const avatarKey = req.file.key;

  try {
    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: { avatarUrl: avatarKey }, // Save the KEY (path) to the database
      select: { id: true, email: true, name: true, avatarUrl: true, role: true }
    });

    const signedUser = await signUserAvatar(updatedUser);

    res.json(signedUser);
  } catch (error) {
    res.status(500).json({ message: "Error updating avatar" });
  }
});

// PUT /api/user/password - Change password
router.put('/password', async (req: any, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: "Both fields are required" });
  }

  if (newPassword.length < 8) {
    return res.status(400).json({ message: "New password must be at least 8 chars" });
  }

  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isValid = await bcrypt.compare(currentPassword, user.password as string);
    if (!isValid) {
      return res.status(401).json({ message: "Incorrect current password" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id: req.user.id },
      data: { password: hashedPassword }
    });

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error changing password" });
  }
});

router.post('/link-phone', async (req: any, res) => {
  const { phoneNumber, code } = req.body;
  const userId = req.user.id;

  // Validate Phone Format
  if (!phoneNumber.startsWith('+91') || phoneNumber.includes(' ')) {
     return res.status(400).json({ message: "Invalid phone format. Use +91..." });
  }

  const record = await prisma.verificationCode.findUnique({ where: { contact: phoneNumber } });
  
  if (!record || record.code !== code) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  const existing = await prisma.user.findUnique({ where: { phoneNumber } });
  if (existing) return res.status(400).json({ message: "Phone number already in use" });

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { phoneNumber },
    select: { id: true, email: true, name: true, avatarUrl: true, role: true, phoneNumber: true, googleId: true }
  });
  
  await prisma.verificationCode.delete({ where: { contact: phoneNumber } });
  
  const signedUser = await signUserAvatar(updatedUser);
  res.json({ message: "Phone number linked successfully", user: signedUser });
});

// 2. Send Email OTP (New)
router.post('/send-email-otp', async (req: any, res) => {
  const { email } = req.body;
  const userId = req.user.id;

  if (!email) return res.status(400).json({ message: "Email required" });

  // Check if email is already taken
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return res.status(400).json({ message: "Email already in use" });

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

  await prisma.verificationCode.upsert({
    where: { contact: email },
    update: { code, expiresAt },
    create: { contact: email, code, expiresAt }
  });

  try {
    await sendVerificationEmail(email, code);
    res.json({ message: "OTP sent to email" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Failed to send email" });
  }
});

// 3. Link Email (Updated to Verify OTP)
router.post('/link-email', async (req: any, res) => {
  const { email, code } = req.body;
  const userId = req.user.id;

  const record = await prisma.verificationCode.findUnique({ where: { contact: email } });
  if (!record || record.code !== code || record.expiresAt < new Date()) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return res.status(400).json({ message: "Email already in use" });

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { email },
    select: { id: true, email: true, name: true, avatarUrl: true, role: true, phoneNumber: true, googleId: true }
  });

  await prisma.verificationCode.delete({ where: { contact: email } });

  const signedUser = await signUserAvatar(updatedUser);
  res.json({ message: "Email linked successfully", user: signedUser });
});

// 4. Unlink Phone (New)
router.post('/unlink-phone', async (req: any, res) => {
  const userId = req.user.id;
  const user = await prisma.user.findUnique({ where: { id: userId } });

  // Safety Check: Must have email or Google ID before unlinking phone
  if (!user?.email && !user?.googleId) {
    return res.status(400).json({ message: "You cannot unlink your only login method." });
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { phoneNumber: null },
    select: { id: true, email: true, name: true, avatarUrl: true, role: true, phoneNumber: true, googleId: true }
  });

  const signedUser = await signUserAvatar(updatedUser);
  res.json({ message: "Phone number unlinked", user: signedUser });
});

// 5. Unlink Email (New)
router.post('/unlink-email', async (req: any, res) => {
  const userId = req.user.id;
  const user = await prisma.user.findUnique({ where: { id: userId } });

  // Safety Check
  if (!user?.phoneNumber && !user?.googleId) {
    return res.status(400).json({ message: "You cannot unlink your only login method." });
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { email: null },
    select: { id: true, email: true, name: true, avatarUrl: true, role: true, phoneNumber: true, googleId: true }
  });

  const signedUser = await signUserAvatar(updatedUser);
  res.json({ message: "Email unlinked", user: signedUser });
});

export default router;