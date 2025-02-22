import validator from "validator"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import UserModel from "../models/userModel.js"
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from "../models/doctorModel.js"
import appointmentModel from "../models/appointmentModel.js"
import razorpay from 'razorpay'

//API to register user

const  registerUser =async(req,res)=>{
    try {
        const {name,email,password}=req.body
        if(!name || !password || !email){
            return res.json({success:false,message:"Missing Details"})
        }
        //validating email format
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"enter a valid email"})
        }

        //validating a strong password
        if(password.length < 8){
            return res.json({success:false,message:"enter a strong password"})

        }
        //hashing user password
        const salt=await bcrypt.genSalt(10)
        const hashdPassord =await bcrypt.hash(password,salt)

        const userData={
            name,
            email,
            password : hashdPassord
        }

        const newUser= new UserModel(userData)
       const user=await newUser.save()
       

       const token =jwt.sign({id:user._id},process.env.JWT_SECRET)
       res.json({success:true,token})


    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

//API for user login 
const loginUser =async(req,res)=>{
    try {
        const {email,password}=req.body
        const user=await UserModel.findOne({email})

        if(!user){
           return res.json({success:false,message:"User does not Exit "})
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(isMatch){
            const token=jwt.sign({id:user._id},process.env.JWT_SECRET)
            res.json({success:true,token})
        }else{
            res.json({success:true,message:"Invalid credentails "})
        }

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

//API to get user profile data
const getProfile =async (req,res)=>{
    try {
        const {userId}=req.body
        const userData=await UserModel.findById(userId).select('-password')
        res.json({success:true,userData})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

//API to update user profile
const updateProfile=async(req,res)=>{
    try {
        const {userId,name,phone,address,dob,gender}=req.body
        const imagefile=req.file
        if(!name || !phone || !gender || !dob ){
            return res.json({success:false,message:"Data Missing"})
        }
        await UserModel.findByIdAndUpdate(userId,{name,phone,dob,address:JSON.parse(address),gender})
        if(imagefile){

            //upload image  to cloudinary
            const imageupload =await cloudinary.uploader.upload(imagefile.path,{resource_type:'image'})
            const imageURL=imageupload.secure_url
            await UserModel.findByIdAndUpdate(userId,{image:imageURL})
        }
        res.json({success:true,message:"Profile Updated"})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

//API to book appointment 
const BookAppointment =async (req,res)=>{
    try {
        const {userId,docId,slotDate,slotTime}=req.body
        const docData=await doctorModel.findById(docId).select('-password')
        if(!docData.available){
            return res.json({success:false,message:"Doctor not available"})
        }
        let slots_booked=docData.slots_booked
        //checking for slot avilablity
        if(slots_booked[slotDate]){
            if(slots_booked[slotDate].includes(slotTime)){
                return res.json({success:false,message:"Slot not available"})
            }else{
                slots_booked[slotDate].push(slotTime)
            }
        }else{
            slots_booked[slotDate]=[]
            slots_booked[slotDate].push(slotTime)
        }
        const userData=await UserModel.findById(userId).select('-password')
        delete docData.slots_booked
        const appointmentData={
            userId,
            docId,
            slotDate,
            slotTime,
            userData,
            docData,
            amount:docData.fees,
            slotDate,
            date:Date.now()
        }
        const newAppointment =new appointmentModel(appointmentData)
        newAppointment.save()
        console.log(newAppointment)

        //save new slots data in docData
        await doctorModel.findByIdAndUpdate(docId,{slots_booked})
        res.json({success:true,message:"Appointment Booked"})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}


//API to get user appointmwnt for frontend my-appointments page
const listAppointment =async (req,res)=>{
    try {
        const {userId}=req.body
        const appointments= await appointmentModel.find({userId})
        res.json({success:true,appointments})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

//API to Cancel Appointment
const CancelAppointment =async(req,res)=>{
    try {
        const {userId,appointmentId}=req.body
        const appointmentData = await appointmentModel.findById(appointmentId)
        
        //verify appointment users
        if(appointmentData.userId !==userId){
            return res.json({success:false,message:"Unauthorized action "})
        }
           await appointmentModel.findByIdAndUpdate(appointmentData,{cancelled:true})

           //releasing doctor slots 
           const {docId,slotDate,slotTime}=appointmentData
           const doctorData = await doctorModel.findById(docId)

           let slots_booked=doctorData.slots_booked
           slots_booked[slotDate]=slots_booked[slotDate].filter(e=>e !==slotTime)
           await doctorModel.findByIdAndUpdate(docId,{slots_booked})

           res.json({success:true,message:"Appointment Cancel"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }

}

const razorpayInstance =new razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET

})

// API to make payment of appointment using razorpay
const paymentRazorpay =async (req,res)=>{
    try {
        const {appointmentId}=req.body
        const appointmentData=await appointmentModel.findById(appointmentId)
    
        if(!appointmentData || appointmentData.cancelled){
            return res.json({success:false,message:"Appointment Cancelled or not found"})
        }
    
        //cretaing options for razorpay payment
        const options={
            amount:appointmentData.amount * 100,
            currency:process.env.CURRENCY,
            receipt:appointmentId,
        }
    
        //creation of an order 
        const order= await razorpayInstance.orders.create(options)
        res.json({success:true,order})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}


//API to verify payment of razorpay 
const verifyRaazorpay =async (req,res)=>{
    try {
        const {razorpay_order_id}=req.body
        const orderInfo =await razorpayInstance.orders.fetch(razorpay_order_id)
        if(orderInfo.status === "paid"){
            await appointmentModel.findByIdAndUpdate(orderInfo.receipt,{payment:true})
            res.json({success:true,message:"Payment Succesful"})
        }else{
            res.json({success:true,message:"Payment failed"})
        }

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

export {registerUser,loginUser,getProfile,updateProfile,BookAppointment,listAppointment,CancelAppointment,paymentRazorpay,verifyRaazorpay}