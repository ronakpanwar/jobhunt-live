import axios from 'axios'
import React, { useEffect } from 'react'
import { JOBS_URL_API } from '@/components/utils/constant'
import { useDispatch } from 'react-redux'
import { setAllJobs } from '@/redux/jobSlice';



const useAllJobs = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        const getAllJobs = async () => {
            try {

                const res = await axios.get(`${JOBS_URL_API}/get`, { withCredentials: true })
                if (res.data.success) {
                    dispatch(setAllJobs(res.data.job));

                }
            } catch (error) {
                console.log(error)
            }
        }
        getAllJobs();

    }, [])
}

export default useAllJobs
