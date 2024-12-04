import axios from 'axios'
import React, { useEffect } from 'react'
import { JOBS_URL_API } from '@/components/utils/constant'
import { useDispatch } from 'react-redux'
import { setAllAdminJobs } from '@/redux/jobSlice';



const useAdminAllJob = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        const getAllAdminJobs = async () => {
            try {

                const res = await axios.get(`${JOBS_URL_API}/getadmin`, { withCredentials: true })
                if (res.data.success) {
                    dispatch(setAllAdminJobs(res.data.job));

                }
            } catch (error) {
                console.log(error)
            }
        }
        getAllAdminJobs();

    }, [])
}

export default useAdminAllJob
