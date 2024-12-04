import React from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './job'
import { space } from 'postcss/lib/list';
import { useSelector } from 'react-redux';
import useAllJobs from '@/hooks/useAllJobs';




const Jobs = () => {
    
  
  const {allJobs} = useSelector(store=>store.job);

  return (
    <div>
      <Navbar />
<div className="max-w-7xl mt-5 mx-4 sm:mx-10 lg:mx-20">
  <div className="flex flex-col sm:flex-row gap-5">
    <div className="w-full sm:w-[20%] mb-5 sm:mb-0">
      <FilterCard />
    </div>

    {allJobs.length <= 0 ? (
      <span>No Jobs Found..</span>
    ) : (
      <div className="flex-1 h-[80vh] overflow-y-auto pb-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {allJobs.map((job) => (
            <div key={job._id}>
              <Job job={job} />
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
</div>

    </div>
  )
}

export default Jobs
