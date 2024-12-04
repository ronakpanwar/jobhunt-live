import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import ListOfCompany from './ListOfCompany'
import { useNavigate } from 'react-router-dom'

import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setFilterCompanyByText } from '@/redux/companySlice'

const Companies = () => {
  useGetAllCompanies();
  const navigate = useNavigate();
  const [input , setInput] = useState("");
  const dispatch  = useDispatch();

  useEffect(()=>{
     dispatch(setFilterCompanyByText(input));
  },[input])

  return (
    <div>
      <Navbar />
      <div className='max-w-6xl m-auto'>
        <div className='mt-5 flex justify-between items-center'>
          <input className='px-4 py-2 border-2 border-black rounded-sm w-fit'
           type="text" 
           placeholder='Filter by name'
           onChange={(e)=>setInput(e.target.value)}
           />
          <Button onClick={() => navigate('/admin/companies/create')} className='my-2 bg-violet-600 hover:bg-violet-700'  >Add Company</Button>
        </div>
        <div>
          <ListOfCompany />
        </div>
      </div>
    </div>
  )
}

export default Companies
