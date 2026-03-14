import axios from "axios"

const API_URL = "https://api.groq.com/openai/v1/chat/completions"

export const analyzeResumeWithAI = async (resumeText) => {

  try {

    const response = await axios.post(
      API_URL,
      {
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "user",
            content: `Analyze this resume.

Give:
1. Resume score out of 100
2. Improvement suggestions
3.ATS compatibility score out of 100


ATS score : <number>
Resume score :<number>

Resume:
${resumeText.slice(0,3000)}`
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    )

    return response.data.choices[0].message.content

  } catch (err) {

    console.log("AI ERROR:", err.response?.data || err.message)
    return "AI analysis failed"

  }

}


export const improveResumeWithAI = async (resumeText) => {

  try {

    const response = await axios.post(
      API_URL,
      {
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "user",
            content: `Improve this resume.

Provide:

1. Improved professional summary
2. Improved project descriptions
3. Recommended technical skills to add
4. Best job roles for this candidate
5. Expected annual salary package for those roles (India)

Resume:
${resumeText.slice(0,3000)}`
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    )

    return response.data.choices[0].message.content

  } catch (err) {

    console.log("AI ERROR:", err.response?.data || err.message)
    return "AI improvement failed"

  }

}