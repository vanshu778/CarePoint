
import axios from "axios";
import { createContext,useState } from "react";
import { toast } from "react-toastify";

export const AdminContext=createContext()

const AdminContextProvider =(props)=>{
  const [aToken, setAToken] = useState(localStorage.getItem('aToken')?localStorage.getItem('aToken'):"")
  const [doctors, setDoctors] = useState([])
  const [appointments,setAppointmnets]=useState([])
  const [dashData, setdashData] = useState(false)

  const backendUrl='https://carepoint.onrender.com';
  const getAllDoctors =async()=>{
    try {
      const {data}=await axios.post(backendUrl + '/api/admin/all-doctors',{},{headers:{aToken}})
      if(data.success){
        setDoctors(data.doctors)
        // console.log(data.doctors);
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }
  }
  const changeAvailablity =async(docId)=>{
    try {
      const {data}=await axios.post(backendUrl + '/api/admin/change-availability',{docId},{headers:{aToken}})
      if(data.success){
        toast.success(data.message)
        getAllDoctors()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }
  }

  const getAllappointments=async()=>{
    try {
      const {data}=await axios.get(backendUrl +'/api/admin/appointments',{headers:{aToken}})
      if(data.success){
        setAppointmnets(data.appointments)
        // console.log(data.appointments)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const cancelAppointment =async(appointmentId)=>{
    try {
      const {data}=await axios.post(backendUrl +'/api/admin/cancel-appointment',{appointmentId},{headers:{aToken}})
      if(data.success){
        toast.success(data.message)
        getAllappointments()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const getDashData =async ()=>{
    try {
      const {data}=await axios.get(backendUrl +'/api/admin/dashboard',{headers:{aToken}})
      if(data.success){
        setdashData(data.dashData)
        // console.log(data.dashData)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

    const value={
      aToken, setAToken,
      backendUrl,
      doctors,
      getAllDoctors,
      changeAvailablity,
      appointments,setAppointmnets,
      getAllappointments,
      cancelAppointment,
      dashData,
      getDashData
    }
    return(
        <AdminContext.Provider value={value}>
          {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider


