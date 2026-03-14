import { useState } from "react"
import ScoreCircle from "../components/ScoreCircle"
import { useNavigate } from "react-router-dom"
import FloatingBackground from "../components/FloatingBackground"

export default function Upload() {

  const [file, setFile] = useState(null)
  const [result, setResult] = useState("")
  const navigate = useNavigate()
  const [atsScore,setAtsScore]=useState("")
  const [score,setscore] = useState(null)




  const handleUpload = async () => {

    if(!file){
        alert("please selecte resume")
    }

    const token = localStorage.getItem("token")

    const formData = new FormData()
    formData.append("resume", file)

    try {

      const res = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        headers:{
            Authorization : `Bearer ${token}`
        },
        body: formData
      })

      const data = await res.json()

      setResult(data.atsScore)
      setAtsScore(data.aiAnalysics)
      setscore(data.score)

      console.log(data)

      navigate("/result",{state:data})

    } catch (error) {

      console.log(error)

    }


  }

  return (

    <FloatingBackground>
    <div className="flex flex-col items-center justify-center h-screen gap-6">

      <h1 className="text-4xl font-bold">
        Upload Resume
      </h1>

      <input
        type="file"
        onChange={(e)=>setFile(e.target.files[0])}
      />

      <button
        onClick={handleUpload}
        className="px-6 py-3 bg-black text-white rounded-xl hover:scale-105 transition"
      >
        Analyze Resume
      </button>

      {result && (
       <div className="mt-8 flex flex-col items-center gap-6">

        <ScoreCircle score={score}/>

        <div className="max-w-xl p-4 bg-white shadow rounded-lg">
          <h2 className="font bold mb-2">AI Suggestion</h2>
          <p className="text-sm">{result}</p>
        </div>
       </div>
      )}

    </div>

    </FloatingBackground>
  )
}