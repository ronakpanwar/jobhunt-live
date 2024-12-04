import axios from 'axios'
import React, { useEffect } from 'react'
import {CREATE_COMPANY_API } from '@/components/utils/constant'
import { useDispatch } from 'react-redux'

import { setCompanies } from '@/redux/companySlice';




const useGetAllCompanies = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        const getCompanies= async () => {
            try {

                const res = await axios.get(`${CREATE_COMPANY_API}/get`, { withCredentials: true })
                if (res.data.success) {
                    dispatch(setCompanies(res.data.company));

                }
            } catch (error) {
                console.log(error)
            }
        }
        getCompanies();

    }, [])
}

export default useGetAllCompanies