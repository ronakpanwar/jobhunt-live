import React from 'react'
import Navbar from './shared/Navbar'
import Job from './job.jsx'

const randomJobs = [1, 2, 3,4 ]

const Browse = () => {
  return (
    <div >
    <Navbar/>
      <div className='max-w-7xl  mx-20 my-10'>
        <h1 className='text-2xl font-bold'>Search Results ({randomJobs.length})</h1>
        <div className='grid grid-cols-3 gap-4'>
            {
                randomJobs.map((e,index)=>{
                    return(
                        <Job/>
                    )   
                })
            }
        </div>
      </div>
    </div>
  )
}

export default Browse
