import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import useGetJobById from '@/hooks/useGetJobById';
import { useDispatch, useSelector } from 'react-redux';
import { JOBS_URL_API } from './utils/constant';
import axios from 'axios';
import { setSingleJob } from '@/redux/jobSlice';
import { toast } from 'sonner';
import { APPLY_URL_API } from './utils/constant';

const JobDetails = () => {


  const params = useParams();
  const jobId = params.id;
  const {singleJob} = useSelector(store=>store.job);
  const {user} = useSelector(store=>store.auth)
  const dispatch = useDispatch()
  const isInitialApplied = singleJob?.applications.some(application=>application.applicant === user?._id) ||false ;
  const [isApplied , setIsApplied] = useState(isInitialApplied)
  
 



   const getApplyJob= async(e)=>{
    try {
      const res = await axios.get(`${APPLY_URL_API}/apply/${jobId}`,{withCredentials:true})
      if(res.data.success){
        toast.success(res.data.message);
        setIsApplied(true)
        const update = {...singleJob , applications:[
          ...singleJob.applications ,  {applicant:user?._id}  
        ]}
        dispatch(setSingleJob(update))
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
   }



   useEffect(() => {
    const getJobsByID = async () => {
        try {

            const res = await axios.get(`${JOBS_URL_API}/get/${jobId}`, { withCredentials: true })
            if (res.data.success) {
                dispatch(setSingleJob(res.data.job));
                setIsApplied(res.data.job.applications.some(application=>application.applicant===user?._id))
            }
        } catch (error) {
            console.log(error)
        }
    }
    getJobsByID();

}, [jobId , dispatch,user?._id ]) ;

console.log(isApplied);
console.log(user?._id)
 

  return (
    <div className='max-w-7xl  mx-20 my-10 '>
      <div className='flex justify-between items-center'>
        <div className=''>
            <h1 className='font-bold text-xl '>{singleJob?.title}</h1>
            <div class="w-full flex flex-wrap items-center pt-2 gap-2">
                <span class="bg-blue-50 text-blue-600 px-3 py-1 text-sm font-medium rounded-full">{singleJob?.position}</span>
                <span class="bg-green-50 text-green-600 px-3 py-1 text-sm font-medium rounded-full">{singleJob?.jobType}</span>
                <span class="bg-purple-50 text-purple-600 px-3 py-1 text-sm font-medium rounded-full">{singleJob?.salary} LPA</span>
            </div>
        </div>
        <Button disabled={isApplied} onClick={isApplied?null:  getApplyJob} className={`rounded-lg ${isApplied ? 'bg-gray-600 curser-not-allowed' : 'bg-violet-600 hover:bg-violet-700'}`}>{isApplied? 'Alredy applied' : 'Apply Now'}</Button>
      </div>
      <h1 className='mt-2 font-bold text-xl border-b-2 border-b-gray-400 py-2'>Job Description </h1>
      <div>
        <h1 className='font-bold text-lg my-1'>Role : <span className='font-normal pl-4 text-gray-700'>{singleJob?.title} </span></h1>
        <h1 className='font-bold text-lg my-1'>Location : <span className='font-normal pl-4 text-gray-700'>{singleJob?.location}</span></h1>
        <h1 className='font-bold text-lg my-1'>Description : <span className='font-normal pl-4 text-gray-700'>{singleJob?.description}</span></h1>
        <h1 className='font-bold text-lg my-1'>Experience : <span className='font-normal pl-4 text-gray-700'>{singleJob?.experience}</span></h1>
        <h1 className='font-bold text-lg my-1'>Salary : <span className='font-normal pl-4 text-gray-700'>{singleJob?.salary} LPA </span></h1>
        <h1 className='font-bold text-lg my-1'>Requirments: <span className='font-normal pl-4 text-gray-700'>{singleJob?.requirments }  </span></h1>
        <h1 className='font-bold text-lg my-1'>Total Applicants : <span className='font-normal pl-4 text-gray-700'>{singleJob?.applications?.length}</span></h1>
        <h1 className='font-bold text-lg my-1'>Posted Date : <span className='font-normal pl-4 text-gray-700'>13-08-24</span></h1>
      </div>
    </div>
  )
}

export default JobDetails

