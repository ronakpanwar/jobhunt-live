import axios from 'axios'
import React, { useEffect } from 'react'
import { JOBS_URL_API } from '@/components/utils/constant'
import { useDispatch } from 'react-redux'
import { setAllJobs, setSingleJob } from '@/redux/jobSlice';



const useGetJobById = (jobId) => {

    const dispatch = useDispatch();
  
}

export default useGetJobById
