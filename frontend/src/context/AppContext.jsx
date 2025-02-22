import { createContext } from "react";
import axios from 'axios'
import { useState } from "react";
import { useEffect } from "react";
import {toast} from 'react-toastify'

export const AppContext =createContext()

const AppContextProvider=(props)=>{
    const [doctors, setDoctors] = useState([])
    const [token, setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):false)
const currencySymbol='$'
const backendUrl='https://carepoint.onrender.com'
const [userData, setuserData] = useState(false)


    const getDoctorsData=async()=>{
        try {
            const {data}=await axios.get(backendUrl + '/api/doctor/list')
            if(data.success){
                setDoctors(data.doctors)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
            
        }
    }


    const loadUserProfileData=async(req,res)=>{
        try {
            const {data}=await axios.get(backendUrl + '/api/user/get-profile',{headers:{token}})
            if(data.success){
                setuserData(data.userData)
                // console.log(data)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)   
        }
    }
    

    const value={
        doctors,getDoctorsData,
        currencySymbol,
        token,
        setToken,
        backendUrl,
        userData,
        setuserData,
        loadUserProfileData
       }

useEffect(() => {
getDoctorsData()
}, [])

useEffect(() => {
    if(token){
    loadUserProfileData()
    }else{
        setuserData(false)
    }
}, [token])

    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}


export default AppContextProvider