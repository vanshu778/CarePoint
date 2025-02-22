import express from 'express'
import { doctorList,loginDoctor,appointmentsDoctor,appointmentComplete,appointmentCancel,doctorDashboard,doctorProfile,updateDoctorProfile } from '../controllers/doctorController.js'
import AuthDoctor from '../middlewares/AuthDoctor.js'

const doctorRouter =express.Router()

doctorRouter.get('/list',doctorList)
doctorRouter.post('/login',loginDoctor)
doctorRouter.get('/appointments',AuthDoctor,appointmentsDoctor)
doctorRouter.post('/complete-appointment',AuthDoctor,appointmentComplete)
doctorRouter.post('/cancel-appointment',AuthDoctor,appointmentCancel)
doctorRouter.get('/dashboard',AuthDoctor,doctorDashboard)
doctorRouter.get('/profile',AuthDoctor,doctorProfile)
doctorRouter.post('/update-profile',AuthDoctor,updateDoctorProfile)


export default doctorRouter