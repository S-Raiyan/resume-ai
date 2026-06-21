import Resume from "../models/Resume.js"
import fs from "fs"
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs"
import { analyzeResumeWithAI, improveResumeWithAI } from "../services/aiService.js"


const uploadResume = async (req, res) => {

  try {

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" })
    }

    const filePath = `uploads/${req.file.filename}`

    const dataBuffer = new Uint8Array(fs.readFileSync(filePath))

    const pdf = await getDocument({ data: dataBuffer }).promise

    let text = ""

    for (let i = 1; i <= pdf.numPages; i++) {

      const page = await pdf.getPage(i)

      const content = await page.getTextContent()

      const strings = content.items.map(item => item.str)

      text += strings.join(" ")
    }

    const resumeText = text.toLowerCase()

    const aiResult = await analyzeResumeWithAI(resumeText)

    let score = 50
    let suggestions = []

    if (resumeText.includes("project")) score += 10
    else suggestions.push("Add project experience")

    if (resumeText.includes("github")) score += 10
    else suggestions.push("Add GitHub profile")

    if (resumeText.includes("react")) score += 10
    else suggestions.push("Add frontend frameworks like React")

    if (resumeText.includes("node")) score += 10
    else suggestions.push("Mention backend technologies like Node.js")

    if (resumeText.includes("internship")) score += 10
    else suggestions.push("Add internship or real experience")

    if (!resumeText.includes("skills")) {
      suggestions.push("Add a skills section for ATS compatibility")
    }

    if (!resumeText.includes("education")) {
      suggestions.push("Add education section")
    }

    if (!resumeText.includes("experience")) {
      suggestions.push("Add work experience section")
    }

    const newResume = new Resume({
      userId: req.user?.id || null,
      fileName: req.file.filename,
      score,
      suggestions,
      aiAnalysis: aiResult
    })

    await newResume.save()


    // ✅ AUTO DELETE OLD RESUMES (KEEP ONLY 3)

    const resumes = await Resume
      .find({ userId: req.user?.id })
      .sort({ createdAt: 1 })

    if (resumes.length > 3) {

      const extra = resumes.length - 3

      for (let i = 0; i < extra; i++) {

        await Resume.findByIdAndDelete(resumes[i]._id)

      }

    }


    res.json({
      message: "Resume analyzed successfully",
      score,
      suggestions,
      aiAnalysis: aiResult
    })

  } catch (err) {

    console.log(err)

    res.status(500).json({ error: "Resume analysis failed" })

  }

}



export const getMyResumes = async (req, res) => {

  try {

    const resumes = await Resume.find({
      userId: req.user?.id
    }).sort({ createdAt: -1 })

    res.json(resumes)

  } catch (err) {

    console.log(err)

    res.status(500).json({
      error: "failed to fetch resumes"
    })

  }

}



export const deleteResume = async (req, res) => {

  try {

    const resume = await Resume.findById(req.params.id)

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" })
    }

    if (resume.userId?.toString() !== req.user?.id) {
      return res.status(403).json({ message: "Unauthorized" })
    }

    await Resume.findByIdAndDelete(req.params.id)

    res.json({ message: "Resume deleted successfully" })

  } catch (err) {

    console.log(err)

    res.status(500).json({ error: "Delete failed" })

  }

}



export const getMyResumesById = async (req, res) => {

  try {

    const resume = await Resume.findById(req.params.id)

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" })
    }

    res.json(resume)

  } catch (err) {

    console.log(err)

    res.status(500).json({ error: "failed to fetch resume" })

  }

}



export const improveResume = async (req, res) => {

  try {

    const resume = await Resume.findById(req.params.id)

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" })
    }

    const improvedContent = await improveResumeWithAI(resume.aiAnalysis || "")

    res.json({
      message: "Resume improvement generated",
      improvement: improvedContent
    })

  } catch (err) {

    console.log(err)

    res.status(500).json({
      error: "Improvement failed"
    })

  }

}



export default uploadResume