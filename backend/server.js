import dotenv from "dotenv"
dotenv.config({path:"./.env"})
import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import router from "./routes/resumeRoutes.js"

import authRoutes from "./routes/authRoutes.js"

            
const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("mongo db is connnect"))
.catch(err => console.log(err))

app.use("/api/auth",authRoutes)
app.use("/api", router)

app.listen(5000,()=>{console.log("sever runnig on port 5000")})
