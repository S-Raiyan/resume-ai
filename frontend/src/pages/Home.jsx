import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import FloatingBackground from "../components/FloatingBackground"
import AOS from "aos"
import "aos/dist/aos.css"

export default function Home(){

  const navigate = useNavigate()

  const [userName,setUserName] = useState(null)

  useEffect(()=>{

    const name = localStorage.getItem("userName")

    if(name){
      setUserName(name)
    }

    AOS.init({
      duration:3000,
      once:true
    })

  },[])


  const logout = () =>{
    localStorage.removeItem("token")
    localStorage.removeItem("userName")
    setUserName(null)
    navigate("/")
  }


  const analyzeResume = () =>{

    const token = localStorage.getItem("token")

    if(!token){
      navigate("/login")
    }else{
      navigate("/upload")
    }

  }

  // ✅ Safe first letter
  const firstLetter = userName ? userName.charAt(0).toUpperCase() : ""



  return(

    <FloatingBackground>



    <div>

      {/* Navbar */}

      <div className="flex justify-between items-center p-6">

        <h1 className="text-2xl font-bold">
          ResumeAI
        </h1>

        <div className="flex gap-4 items-center">

          {userName ? (

            <>

              <div className="flex items-center gap-3">

                {/* Avatar */}

                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white flex items-center justify-center font-bold shadow-lg">
                  {firstLetter}
                </div>

                <span className="font-semibold text-lg">
                  Hello,{userName}
                </span>

              </div>

              <button
                onClick={logout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Logout
              </button>

            </>

          ) : (

            <>
              <button
                onClick={()=>navigate("/login")}
                className="px-4 py-2 bg-white text-black rounded"
              >
                Login
              </button>

              <button
                onClick={()=>navigate("/register")}
                className="px-4 py-2 bg-black text-white rounded"
              >
                Register
              </button>
            </>

          )}

        </div>

      </div>


      {/* Hero Section */}

      <div data-aos="fade-up" className="flex flex-col items-center text-center mt-20 px-6">

        <h1 className="text-5xl font-bold mb-6">
          AI Powered Resume Analyzer
        </h1>

        <p className="text-lg max-w-xl mb-8">
          Upload your resume and get instant AI feedback, ATS score,
          and professional suggestions to improve your chances of getting hired.
        </p>

        <button
          onClick={analyzeResume}
          className="bg-black text-white px-8 py-3 rounded text-lg hover:bg-gray-800 transition"
        >
          Analyze Resume
        </button>

      </div>


      {/* Features */}

      <div data-aos="zoom-in-up" className="grid md:grid-cols-3 gap-8 mt-32 px-10">

        <div data-aos="flip-right" data-aos-duration="5000" data-aos-delay="400" className="bg-white text-black p-6 rounded-xl shadow-lg">

          <h2 className="text-xl font-bold mb-2">
            AI Resume Score
          </h2>

          <p>
            Get a smart AI score to know how strong your resume is.
          </p>

        </div>


        <div data-aos="flip-right" data-aos-duration="5000" data-aos-delay="800" className="bg-white text-black p-6 rounded-xl shadow-lg">

          <h2 className="text-xl font-bold mb-2">
            Smart Suggestions
          </h2>

          <p>
            Improve your resume with AI powered feedback.
          </p>

        </div>


        <div data-aos="flip-right" data-aos-duration="5000" data-aos-delay="1200" className="bg-white text-black p-6 rounded-xl shadow-lg">

          <h2 className="text-xl font-bold mb-2">
            Resume History
          </h2>

          <p>
            Track all your resume analysis results in your dashboard.
          </p>

        </div>


        <div data-aos="flip-right" data-aos-duration="5000" data-aos-delay="1600" className="bg-white text-black p-6 rounded-xl shadow-lg">

          <h3 className="text-xl font-bold mb-2">
            AI Resume Analysis
          </h3>

          <p className="text-gray-600">
            Our AI scans your resume and provides detailed feedback
            to improve your job chances.
          </p>

        </div>


        <div data-aos="flip-right" data-aos-duration="5000" data-aos-delay="2000" className="bg-white text-black p-6 rounded-xl shadow-lg">

          <h3 className="text-xl font-bold mb-2">
            ATS Compatibility
          </h3>

          <p className="text-gray-600">
            Check how well your resume performs in Applicant
            Tracking Systems used by companies.
          </p>

        </div>


        <div data-aos="flip-right" data-aos-duration="5000" data-aos-delay="2400" className="bg-white text-black p-6 rounded-xl shadow-lg">

          <h3 className="text-xl font-bold mb-2">
            Instant Suggestions
          </h3>

          <p className="text-gray-600">
            Get actionable tips to improve your skills, projects,
            and resume structure.
          </p>

        </div>

      </div>


      {/* How It Works */}

      <div  className="mt-32 text-center px-6">

        <h2 data-aos="fade-up" data-aos-duration="5000" data-aos-delay="500" className="text-4xl font-bold mb-10">
          How It Works
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div>

            <h3 data-aos="fade-up" data-aos-duration="6000" data-aos-delay="2000" className="text-xl font-bold mb-2">
              1. Upload Resume
            </h3>

            <p data-aos="fade-up" data-aos-duration="6000" data-aos-delay="2000">
              Upload your resume in seconds.
            </p>

          </div>

          <div>

            <h3 data-aos="fade-up" data-aos-duration="6000" data-aos-delay="2000" className="text-xl font-bold mb-2">
              2. AI Analysis
            </h3>

            <p data-aos="fade-up" data-aos-duration="6000" data-aos-delay="2000">
              Our AI scans your resume and evaluates it.
            </p>

          </div>

          <div>

            <h3 data-aos="fade-up" data-aos-duration="6000" data-aos-delay="2000" className="text-xl font-bold mb-2">
              3. Get Feedback
            </h3>

            <p data-aos="fade-up" data-aos-duration="6000" data-aos-delay="2000">
              Receive score and suggestions instantly.
            </p>

          </div>

        </div>

      </div>


      {/* Call To Action */}

      <div data-aos="zoom-out-down" data-aos-duration="5000" data-aos-delay="5000" className="mt-32 text-center pb-20">

        <h2 className="text-3xl font-bold mb-6">
          Start Improving Your Resume Today
        </h2>

        <button
          onClick={()=>navigate("/register")}
          className="bg-black text-white px-10 py-4 rounded text-lg hover:bg-gray-800 transition"
        >
          Get Started
        </button>

      </div>

      {/* Footer */}

      <footer data-aos="slide-right" data-aos-duration="2000" data-aos-delay="1000" className="bg-black text-white mt-20 py-10 text-center ">
        <h2 className="text-xl font-semibold mb-3">
          ResumeAI
        </h2>

        <p className="text-gray-400 mb-4 ">
          AI powered resume analysis to improve your job opportunities
        </p>

        <div className="flex justify-center gap-6 text-sm text-gray-400">
          <span className="cursor-pointer hover:text-white">About</span>
          <span className="cursor-pointer hover:text-white">Privacy</span>
          <span className="cursor-pointer hover:text-white">Contact</span>
        </div>
        <p className="text-gray-500 mt-6 text-sum">© 2026 ResumeAI. All rights reserved.</p>
      </footer>

    </div>

    </FloatingBackground>

  )

}