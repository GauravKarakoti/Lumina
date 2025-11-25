import { Router } from 'express'
import prisma from '../db.js'
import multer from 'multer'

// +++ Imports for B2 Object Storage +++
import multerS3 from 'multer-s3-v3'
// Import the pre-configured S3 client and signed URL generator from your utility file
import { s3 } from '../lib/s3Utils.js' 
import { sendNotification } from '../lib/notification.js'
// The generateSignedUrl function is not used here, as notes are typically viewed 
// via the dedicated signed-url route in content.ts. We'll remove it for simplicity.

const router = Router()

// +++ Multer storage configuration for B2 +++
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.B2_BUCKET_NAME!,
    // Bucket is private, so we don't need the 'acl' property
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req: any, file: any, cb: any) {
      // Use the 'notes' folder and create a unique key
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
      const fileExtension = file.originalname.split('.').pop()
      const s3Key = `notes/note-${uniqueSuffix}.${fileExtension}`
      cb(null, s3Key)
    },
  }),
  // Filter for PDF files
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true)
    } else {
      // TypeScript requires explicit casting for the error object here
      cb(new Error('Only PDF files are allowed!') as any, false)
    }
  },
})
// +++ End of B2 Multer config +++


// --- Data Creation Routes (Unchanged) ---

// Create Course
router.post('/course', async (req, res) => {
  const { name, id } = req.body // e.g., id: "btech", name: "Bachelors of Technology"
  const course = await prisma.course.create({ data: { id, name } })
  res.json(course)
})

// Create Branch
router.post('/branch', async (req, res) => {
  const { name, id, courseId } = req.body
  const branch = await prisma.branch.create({ data: { id, name, courseId } })
  res.json(branch)
})

// Create Semester
router.post('/semester', async (req, res) => {
  const { name, id } = req.body
  const semester = await prisma.semester.create({ data: { id, name } })
  res.json(semester)
})

// Create Subject
router.post('/subject', async (req, res) => {
  const { name, id, branchId, semesterId } = req.body
  const subject = await prisma.subject.create({ data: { id, name, branchId, semesterId } })
  res.json(subject)
})

router.post('/topic', async (req, res) => {
  const { name, subjectId } = req.body
  const topic = await prisma.topic.create({
    data: { name, subjectId },
  })
  res.json(topic)
})

// --- Note Upload Route (MIGRATED TO B2) ---
router.post('/note', upload.single('pdfFile'), async (req: any, res) => {
  // 'pdfFile' must match the name of the file input field in your admin form

  // The TypeScript error is fixed by using 'req.file.key'
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded or file is not a PDF.' })
  }

  const { title, topicId } = req.body
  const uploaderId = req.user!.id 

  // Store the permanent S3/B2 key (path) in the database
  const pdfKey = req.file.key
  
  if (!title || !topicId) {
    // NOTE: You should implement a mechanism to delete the orphaned file from B2 here, 
    // as it was uploaded successfully but the DB transaction will fail.
    return res.status(400).json({ error: 'Title and topicId are required.' })
  }

  try {
    const note = await prisma.note.create({
      data: {
        title,
        pdfUrl: pdfKey, // Store the B2 key/path
        topicId,
        uploaderId,
      },
      // You may want to include the signed URL in the response for immediate confirmation,
      // but retrieving notes should generally use the dedicated /signed-url endpoint.
    })

    await sendNotification(uploaderId, `Admin Action: Note "${title}" created successfully.`);

    res.json(note)
  } catch (error) {
    // Handle potential DB errors. File deletion from B2 would be required here.
    console.error('Failed to create note:', error)
    res.status(500).json({ error: 'Failed to save note to database.' })
  }
})

export default router