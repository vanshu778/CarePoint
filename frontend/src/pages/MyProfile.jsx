import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import {assets} from '../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const MyProfile = () => {
  const {userData,setuserData,token,loadUserProfileData,backendUrl}=useContext(AppContext)

  const [isEdit, setisEdit] = useState(false)
  const [image, setImage] = useState(false)

  const updateUserProfileData = async () => {
    try {
        const formData = new FormData(); // Correctly initialize FormData
        
        // Use the append method directly without calling formData as a function
        formData.append('name', userData.name);
        formData.append('gender', userData.gender);
        formData.append('address', JSON.stringify(userData.address));
        formData.append('phone', userData.phone);
        formData.append('dob', userData.dob);

        // Append image only if it exists
        if (image) {
            formData.append('image', image);
        }

        // Send the form data via Axios
        const { data } = await axios.post(
            `${backendUrl}/api/user/update-profile`,
            formData,
            { headers: { token } }
        );

        if (data.success) {
            toast.success(data.message);
            await loadUserProfileData(); // Reload the user profile data
            setisEdit(false);
            setImage(false);
        } else {
            toast.error(data.message);
        }
    } catch (error) {
        console.error(error); // Log the error to the console for debugging
        toast.error(error.message); // Show a toast message with the error
    }
};

  return userData && (
    <div className='max-w-lg flex flex-col gap-2 text-sm'>
      {
        isEdit ?<label htmlFor='image'>
          <div className='inline-block relative cursor-pointer '>
            <img className='w-36 rounded ' src={image ? URL.createObjectURL(image): userData.image} alt="" />
            <img className='w-10 absolute bottom-12 right-12'  src={image ? "":assets.upload_icon } alt="" />
          </div>
          <input onChange={(e)=>setImage(e.target.files[0])} type="file"  id="image" hidden />
        </label>:
      <img className='w-36 rounded' src={userData.image} alt="" />
      }
      {
        isEdit ? <input className='bg-gray-50 text-3xl font-medium max-w-60 mt-4 ' type="text" value={userData.name} onChange={e => setuserData(prev => ({ ...prev, name: e.target.value }))} /> : <p className='font-medium text-3xl text-neutral-800 mt-4'>{userData.name}</p>
      }
      <div >
      <hr className='bg-zinc-400 h-[1px] border-none ' />
        <p className='text-neutral-500 underline mt-3'>CONTACT INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium '>Email id:</p>
          <p className='text-blue-500 '>{userData.email}</p>
          <p className='font-medium'>Phone:</p>
          {
            isEdit ? <input className='bg-gray-100 max-w-52 ' type="text" value={userData.phone} onChange={e => setuserData(prev => ({ ...prev, phone: e.target.value }))} /> : <p>{userData.phone}</p>
          }
          <p className='font-medium'>Address:</p>
          {
            isEdit 
            ?
            <p>
              <input className='bg-gray-50'  onChange={(e)=> setuserData(prev=>({...prev,address:{...prev.address,line1 :e.target.value}}))} value={userData.address.line1} type="text" />
              <br />
              <input  className='bg-gray-50'  onChange={(e)=> setuserData(prev=>({...prev,address:{...prev.address,line2 :e.target.value}}))} value={userData.address.line2} type="text" />
            </p>
            :<p className='text-gray-500'>
              {userData.address.line1}
              <br />
              {userData.address.line2}
            </p>
          }
        </div>
      </div>
      <div>
        <p className='text-neutral-500 underline mt-3'>BASIC INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700 '>
          <p className='font-medium'>Gender:</p>
          {
        isEdit ? <select className='max-w-20 bg-gray-100' onChange={(e)=>setuserData(prev =>({...prev,gender:e.target.value}))} value={userData.gender}>
          <option value="Male">Male</option>
          <option value="FeMale">FeMale</option>
        </select>
        : <p className='text-gray-400 '>{userData.gender}</p>
          }
          <p className='font-medium'>Birthday:</p>
          {
            isEdit ? <input className='max-w-28 bg-gray-100' type="date" onChange={(e)=>setuserData(prev=>({...prev,dob:e.target.value}))}  value={userData.dob} /> :
            <p className='text-gray-400'>{userData.dob}</p>
          }
        </div>
      </div>
      <div className='mt-10'>
        {isEdit
        ? <button className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all  ' onClick={updateUserProfileData}>Save information</button>
        :<button className='border border-primary px-8 py-2 rounded-full  hover:bg-primary  hover:text-white transition-all ' onClick={()=>setisEdit(true)}>Edit</button>
        }
      </div>
    </div>
  )
}

export default MyProfile