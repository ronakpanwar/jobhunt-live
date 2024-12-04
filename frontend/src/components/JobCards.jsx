import React from 'react'
import { Badge } from './ui/badge'

const JobCards = ({job}) => {
    return (
        <div class="flex flex-col    gap-3 p-8 bg-white shadow-md rounded-lg  mx-auto my-10">
            <div class="w-full flex flex-col text-start">
                <h1 class="text-2xl font-bold text-gray-900 ">{job?.company?.name}</h1>
                <p class="text-sm text-gray-600">India</p>
            </div>
            <div class="w-full  text-start">
                <h2 class="text-xl font-semibold text-gray-800 mb-2">{job?.title}</h2>
                <p class="text-sm text-gray-500 leading-relaxed">{job?.description}.</p>
            </div>
            <div class="w-full text-start flex flex-wrap items-center gap-2 pt-2">
                <span class="bg-blue-50 text-blue-600 px-3 py-1 text-sm font-medium rounded-full">{job?.position}</span>
                <span class="bg-green-50 text-green-600 px-3 py-1 text-sm font-medium rounded-full">{job?.jobType}</span>
                <span class="bg-purple-50 text-purple-600 px-3 py-1 text-sm font-medium rounded-full">{job?.salary}LPA</span>
            </div>
        </div>


    )
}

export default JobCards
