import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import UserRouter from './routes/userRoute.js'

//app config
const app=express()
const port=process.env.PORT ||  4000;
connectDB()
connectCloudinary()
//middlewares
app.use(express.json())
app.use(cors())


//API endpoints 
app.use("/api/admin",adminRouter)
app.use('/api/doctor',doctorRouter)
app.use('/api/user',UserRouter)

app.get('/',(req,res)=>{
    res.send("API working");
})

app.listen(port,()=>console.log("Server started",port))