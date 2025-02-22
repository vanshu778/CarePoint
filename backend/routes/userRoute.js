import express from 'express'
import { registerUser,loginUser, getProfile, updateProfile,BookAppointment,listAppointment,CancelAppointment,paymentRazorpay,verifyRaazorpay} from '../controllers/usercontroller.js'
import AuthUser from '../middlewares/AuthUser.js'
import upload from '../middlewares/multer.js'

const UserRouter=express.Router()

UserRouter.post('/register',registerUser)
UserRouter.post('/login',loginUser)
UserRouter.get('/get-profile',AuthUser,getProfile)
UserRouter.post('/update-profile',upload.single('image'),AuthUser,updateProfile)
UserRouter.post('/book-appointment',AuthUser,BookAppointment)
UserRouter.get('/appointments',AuthUser,listAppointment)
UserRouter.post('/cancel-appointment',AuthUser,CancelAppointment)
UserRouter.post('/payment-razorpay',AuthUser,paymentRazorpay)
UserRouter.post('/verifyRazorpay',AuthUser,verifyRaazorpay)


export default UserRouter
