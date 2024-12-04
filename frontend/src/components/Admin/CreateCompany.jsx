import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CREATE_COMPANY_API } from '../utils/constant'

import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'
import { toast } from 'sonner'

const CreateCompany = () => {
   const navigate = useNavigate()
   const [companyName, setCompanyName] = useState()
   const dispatch = useDispatch();

   const handleChange = (e)=>{
    setCompanyName(
        e.target.value
    )
   }
   
   const ragisterNewCompany = async()=>{
    try {
        const res = await axios.post(`${CREATE_COMPANY_API}/register` , {companyName} ,{
            headers:{
                'Content-Type':'application/json'
            },
            withCredentials:true
        } )
        if(res?.data?.success){
            dispatch(setSingleCompany(res.data.company))
            toast.success(res.data.message);
            const companyId = res?.data?.company?._id;
            navigate(`/admin/companies/${companyId}`)
        }
       
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message)
    }
   }

  return (
    <div>
       <Navbar/>
       <div className='max-w-4xl mx-auto '>
       <div className='my-10 '>
       <h1  className='font-bold text-2xl'>Your Company Name</h1>
       
       </div>
          <label htmlFor="name">Company Name</label>
          <Input type='text' name='name'  onChange={handleChange} className='my-2' placeholder='Google, Flipcart etc. ' ></Input>

          <div className='flex items-center gap-2 my-10'>
            <Button className='' onClick={()=> navigate('/admin/companies')} variant='outline' > Cancel</Button>
            <Button onClick={ragisterNewCompany} >Continue</Button>
          </div>
       </div>
    </div>
  )
}

export default CreateCompany
