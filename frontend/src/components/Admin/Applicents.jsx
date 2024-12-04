import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { APPLY_URL_API } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { setAllApplicants } from '@/redux/applicationSlice'

const Applicents = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const {applicants} = useSelector(store=>store.application)
    useEffect(()=>{
      const fetchAllApplicants = async()=>{
        try {
            const res = await axios.get(`${APPLY_URL_API}/${params.id}/applicent` , {withCredentials:true})
            
            if(res.data.success){
    dispatch(setAllApplicants(res.data.applications))
            }
        } catch (error) {
            console.log(error)
        }
      }
      fetchAllApplicants()
    },[])

  return (
    <div>
      <Navbar/>
      <div className='max-w-6xl m-auto'>
    <h1 className='font-bold text-2xl'>Applicants {applicants.applications.length}</h1>
       <ApplicantsTable/>
      </div>
    </div>
  )
}

export default Applicents
