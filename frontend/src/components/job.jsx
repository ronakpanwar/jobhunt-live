import React from 'react'
import { Button } from './ui/button'
import { Bookmark, BookMarked, Lasso } from 'lucide-react'

import { Avatar, AvatarImage } from './ui/avatar'
import { useNavigate } from 'react-router-dom'

const job = ({job}) => {
 
    const navigate = useNavigate();

    const getTime= (mongodbTime)=>{
        const createdAt = new Date(mongodbTime);
        const current = new Date();
        const diff = current - createdAt;
        return Math.floor(diff/(1000*24*60*60));
    }

    return (
        <div className='p-5 rounded-md shadow-md'>
            <div className='flex justify-between items-center'>
                <p className='text-gray-700 text-sm'>{getTime(job?.createdAt)===0?"Today":`${getTime(job?.createdAt)} days ago`} </p>
                <Button variant="outline" size="icon" className='rounded-full '><Bookmark /></Button>
            </div>
            <div className='flex gap-4 my-2 items-center'>
                <Button className="p-6" variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage src={job?.company?.logo } />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-bold'>{job?.company?.name}</h1>
                    <p className='text-gray-500'    >India</p>
                </div>
            </div>
            <div className='my-2'>
                <h1 className='text-xl font-bold '>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{job?.description}</p>
            </div>
            <div class="w-full flex flex-wrap items-center pt-2 gap-2">
                <span class="bg-blue-50 text-blue-600 px-3 py-1 text-sm font-medium rounded-full">{job?.position}</span>
                <span class="bg-green-50 text-green-600 px-3 py-1 text-sm font-medium rounded-full">{job?.jobType}</span>
                <span class="bg-purple-50 text-purple-600 px-3 py-1 text-sm font-medium rounded-full">{job?.salary}LPA</span>
            </div>
            <div className='flex gap-4 mt-4'>
                <Button onClick={()=> navigate(`/jobDetails/${job._id}`)} variant="outline"  >
                    Details
                </Button>
                <Button className="bg-violet-600">Save for later</Button>
            </div>

        </div>
    )
}

export default job
