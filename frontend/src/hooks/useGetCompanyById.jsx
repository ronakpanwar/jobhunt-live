import axios from 'axios'
import React, { useEffect } from 'react'
import {CREATE_COMPANY_API } from '@/components/utils/constant'
import { useDispatch } from 'react-redux'
import { setAllJobs } from '@/redux/jobSlice';
import { setSingleCompany } from '@/redux/companySlice';
import { useParams } from 'react-router-dom';



const useGetCompanyById = (companyId) => {
 const params = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        const getCompanyById = async () => {
            try {

                const res = await axios.get(`${CREATE_COMPANY_API}/get/${companyId}`, { withCredentials: true })
                if (res.data.success) {

                    dispatch(setSingleCompany(res.data.company));
                    

                }
            } catch (error) {
                console.log(error)
            }
        }
        getCompanyById();

    }, [companyId , dispatch])
}

export default useGetCompanyById
