import React from 'react'
import JobCards from './JobCards';
import { useSelector } from 'react-redux';

// const items = [1, 2 ,3 ,4, 5, 6,7,8];

const LatestJobs = () => {
  
  const {allJobs} = useSelector(store=>store.job);

  return (
    <div className="text-center mx-auto my-20 px-4 sm:px-6 lg:px-10">
  <h1 className="text-3xl sm:text-4xl font-bold mb-8">
    Top Jobs <span className="text-orange-600">Openings</span>
  </h1>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {allJobs.length <= 0 ? (
      <span className="col-span-full text-gray-500">No Job Available</span>
    ) : (
      allJobs.slice(0, 6).map((job) => <JobCards key={job._id} job={job} />)
    )}
  </div>
</div>

  )
}

export default LatestJobs
