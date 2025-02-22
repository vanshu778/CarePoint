import { createContext } from "react";

export const AppContext=createContext()

const AppContextProvider =(props)=>{
    const backendurl='https://carepoint.onrender.com'
    const currency="$"
    const calclateAge=(dob)=>{
        const today= new Date()
        const birthDate =new Date(dob)

        let age=today.getFullYear()-birthDate.getFullYear()
        return age
    }

    const months =["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Otc","Nov","Dec"]
    const slotDateFormat=(slotDate)=>{
      const dateArray=slotDate.split('_')
      return  dateArray[0]+ " " + months[Number(dateArray[1])]+ " " + dateArray[2]
      
    }

    const value={
        calclateAge,
        slotDateFormat,
        currency,
         backendurl
    }
    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider