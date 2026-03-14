import { Route,Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/DashBoard";
import Upload from "./pages/UploadResume";
import ResumeResult from "./pages/ResumeResult";

export default function App(){
  return(
    <Routes>

      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/Register" element={<Register/>}/>
      <Route path="Dashboard" element={<Dashboard/>}/>
      <Route path="/upload" element={<Upload/>}/>
      <Route path="/result" element={<ResumeResult/>}/>

    </Routes>
      
  )
}