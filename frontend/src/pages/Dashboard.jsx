import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import FloatingBackground from "../components/FloatingBackground"

export default function Dashboard(){

  const navigate = useNavigate()
  const [resumes,setResumes] = useState([])

  const logout = () =>{
    localStorage.removeItem("token")
    navigate("/login")
  }

  const deleteResume = async(id)=>{

    const token = localStorage.getItem("token")

    await fetch(`/api/delete/${id}`,{
      method:"DELETE",
      headers:{
        Authorization:`Bearer ${token}`
      }
    })

    setResumes(resumes.filter(r => r._id !== id))

  }

  useEffect(()=>{

    const fetchResumes = async ()=>{

      const token = localStorage.getItem("token")

      const res = await fetch("/api/history",{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })

      const data = await res.json()

      setResumes(Array.isArray(data)?data:[])

    }

    fetchResumes()

  },[])

  return(

    <FloatingBackground>

    <div className="flex flex-col items-center min-h-screen gap-6 py-10">

      <h1 className="text-4xl font-bold">Dashboard</h1>

      <button
        onClick={()=>navigate("/upload")}
        className="bg-black text-white px-6 py-3 rounded"
      >
        Upload Resume
      </button>

      <h2 className="text-2xl font-bold mb-4">Resume History</h2>

      {resumes.map((r)=>(
        <div key={r._id} className="border p-4 mb-3 rounded w-96 flex justify-between items-center">

          <div>
            <p><b>File:</b> {r.fileName}</p>
            <p><b>Score:</b> {r.score}</p>
          </div>

          <button
            onClick={()=>deleteResume(r._id)}
            className="bg-red-500 text-white px-3 py-1 rounded text-sm"
          >
            Delete
          </button>

        </div>
      ))}

      <button
        onClick={logout}
        className="bg-red-600 text-white px-6 py-3 rounded"
      >
        Logout
      </button>

    </div>

    </FloatingBackground>

  )
}
