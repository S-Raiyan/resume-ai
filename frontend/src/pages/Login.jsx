import { useState } from "react"
import { loginuser } from "../services/api"
import { useNavigate } from "react-router-dom"
import FloatingBackground from "../components/FloatingBackground"

export default function Login(){

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const navigate = useNavigate()

  const handleLogin = async () =>{

    const data = await loginuser({
      email,
      password
    })

    if(data && data.token){

      // Save token
      localStorage.setItem("token",data.token)

      // Save username safely
      const name = data.name || data.user?.name || "User"

      localStorage.setItem("userName",name)

      navigate("/")   // go to home page

    }else{
      alert(data.message || "Login failed")
    }

  }

  return(

    <FloatingBackground>

    <div className="flex items-center justify-center min-h-screen">

      <div className="backdrop-blur-lg bg-white/20 border border-white/30 shadow-xl rounded-2xl p-10 w-80 flex flex-col gap-4">

        <h1 className="text-3xl font-bold text-center">
          Login
        </h1>

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
          onClick={handleLogin}
          className="bg-black text-white py-2 rounded hover:bg-gray-800 transition"
        >
          Login
        </button>

        <p className="text-center text-sm">
          Not registered?
          <span
            onClick={()=>navigate("/register")}
            className="ml-1 underline cursor-pointer"
          >
            Register
          </span>
        </p>

      </div>

    </div>

    </FloatingBackground>
  )
}