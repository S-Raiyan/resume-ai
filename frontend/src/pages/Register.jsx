import { useState } from "react"
import { registerUser } from "../services/api"
import { useNavigate } from "react-router-dom"
import FloatingBackground from "../components/FloatingBackground"

export default function Register(){

  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const navigate = useNavigate()

  const handleRegister = async () =>{

    const data = await registerUser({
      name,
      email,
      password
    })

    if(data.token){

      localStorage.setItem("token",data.token)

      // store username
      const username = data.user?.name || name 
      
      
      localStorage.setItem("userName",username)



      navigate("/dashboard")

    }else{
      alert(data.message)
    }

  }

  return(

    <FloatingBackground>

    <div className="flex items-center justify-center min-h-screen">

      <div className="backdrop-blur-lg bg-white/20 border border-white/30 shadow-xl rounded-2xl p-10 w-80 flex flex-col gap-4">

        <h1 className="text-3xl font-bold text-center">
          Register
        </h1>

        <input
          type="text"
          placeholder="Name"
          onChange={(e)=>setName(e.target.value)}
          className="p-2 rounded bg-white/70 text-black outline-none"
        />

        <input
          type="email"
          placeholder="Email"
          onChange={(e)=>setEmail(e.target.value)}
          className="p-2 rounded bg-white/70 text-black outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e)=>setPassword(e.target.value)}
          className="p-2 rounded bg-white/70 text-black outline-none"
        />

        <button
          onClick={handleRegister}
          className="bg-black text-white py-2 rounded hover:bg-gray-800 transition"
        >
          Register
        </button>

        <p className="text-center text-sm">
          Already have an account?
          <span
            onClick={()=>navigate("/login")}
            className="ml-1 underline cursor-pointer"
          >
            Login
          </span>
        </p>

      </div>

    </div>

    </FloatingBackground>
  )
}