import ScoreCircle from "../components/ScoreCircle"
import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import FloatingBackground from "../components/FloatingBackground"

export default function ResumeResult(){

  const location = useLocation()
  const result = location.state
  const [animatedScore, setAnimatedScore] = useState(0) // for animation

  if(!result){
    return(
      
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl font-bold">No Analysis Found</h1>
      </div>
    )
  }

  // Extract ATS score from aiAnalysis string
  let atsScore = 0
  if(result.aiAnalysis){
    const match = result.aiAnalysis.match(/ATS Compatibility Score:\s*(\d{1,3})/i)
    atsScore = match ? Number(match[1]) : 0
  }

  // Animate ATS score
  useEffect(() => {
    let start = 0
    const step = atsScore / 50 // number of animation steps
    const interval = setInterval(() => {
      start += step
      if(start >= atsScore){
        start = atsScore
        clearInterval(interval)
      }
      setAnimatedScore(Math.round(start))
    }, 20)
    return () => clearInterval(interval)
  }, [atsScore])

  // Remove Resume Score and ATS Compatibility Score from AI text
  const cleanAnalysis = result.aiAnalysis
    ?.replace(/\*\*Resume Score:.*?\*\*/gi,"")
    ?.replace(/Resume Score:.*?\n/gi,"")
    ?.replace(/\*\*ATS Compatibility Score:.*?\*\*/gi,"")
    ?.replace(/ATS Compatibility Score:.*?\n/gi,"")
    ?.trim()

  return(

  
    

    <div className="min-h-screen flex flex-col items-center gap-10 p-10 bg-gradient-to-br from-gray-50 to-gray-200">

      {/* Title */}
      <h1 className="text-4xl font-bold text-gray-800">
        Resume Analysis Result
      </h1>

      {/* Resume Score Circle */}
      <ScoreCircle score={result.score}/>

      {/* ATS Score Animated Bar */}
      <div className="max-w-xl w-full bg-white shadow-xl rounded-2xl p-6 border">

        <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
          📊 ATS Score
        </h2>

        <div className="w-full bg-gray-200 h-6 rounded-full overflow-hidden">
          <div
            className="h-6 bg-green-500 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${animatedScore}%` }}
          />
        </div>

        <p className="text-right mt-2 font-bold text-green-600">{animatedScore}/100</p>

      </div>

      {/* Suggestions */}
      {result.suggestions && result.suggestions.length > 0 && (
        <div className="max-w-xl w-full bg-white shadow-xl rounded-2xl p-6 border">

          <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
            💡 Suggestions
          </h2>

          <ul className="list-disc ml-6 space-y-2 text-gray-700">
            {result.suggestions.map((s,i)=>(
              <li key={i}>{s}</li>
            ))}
          </ul>

        </div>
      )}

      {/* AI Resume Feedback */}
      <div className="max-w-xl w-full bg-white shadow-xl rounded-2xl p-6 border">

        <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
          🤖 AI Resume Feedback
        </h2>

        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {cleanAnalysis}
        </p>

      </div>

    </div>

  
  )
}