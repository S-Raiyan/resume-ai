import express from "express"
import upload from "../middleware/uploadMiddleware.js"
import authMiddleware from "../middleware/authMiddleware.js"

import uploadResume, {
  getMyResumes,
  deleteResume,
  getMyResumesById,
  improveResume
} from "../controllers/resumeController.js"

import Resume from "../models/Resume.js"

const router = express.Router()

// Upload Resume
router.post(
  "/upload",
  authMiddleware,
  upload.single("resume"),
  uploadResume
)

// Get My Resumes
router.get(
  "/my-resumes",
  authMiddleware,
  getMyResumes
)

// Resume History (⚡ MOVE THIS ABOVE /:id)
router.get(
  "/history",
  authMiddleware,
  async (req,res) => {
    try{

      const resumes = await Resume.find({ userId: req.user.id })

      res.json(resumes)

    }catch(err){

      res.status(500).json({ message:"Error fetching history" })

    }
  }
)

// Delete Resume
router.delete(
  "/delete/:id",
  authMiddleware,
  deleteResume
)

// Improve Resume
router.post(
  "/improve/:id",
  authMiddleware,
  improveResume
)

// ⚠️ ALWAYS KEEP THIS LAST
router.get(
  "/:id",
  authMiddleware,
  getMyResumesById
)

export default router