import { Search } from 'lucide-react'
import React from 'react'

const heroSection = () => {
    return (
        <div className="text-center px-4 sm:px-6 md:px-10">
  <div className="flex flex-col gap-5 my-10">
    <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-orange-600 font-medium text-sm md:text-base">
      No. 1 Platform for Job
    </span>
    <h1 className="text-3xl md:text-5xl font-bold leading-tight">
      Search, Apply & <br />
      Get Your <span className="text-violet-600">Dream Job</span>
    </h1>
    <p className="text-sm md:text-base text-gray-600 px-2 sm:px-0">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga maxime
      perspiciatis odit rerum impedit.
    </p>
    <div className="flex w-full max-w-xs sm:max-w-md shadow-md border border-gray-200 rounded-full items-center gap-2 px-4 py-2 mx-auto bg-white">
      <input
        type="text"
        placeholder="Find jobs for you..."
        className="outline-none border-none w-full text-gray-700 placeholder-gray-400 text-sm md:text-base"
      />
      <button className="rounded-full bg-violet-500 text-white p-2 hover:bg-violet-600 focus:outline-none transition duration-300">
        <Search className="h-4 w-4 md:h-5 md:w-5" />
      </button>
    </div>
  </div>
</div>

    )
}

export default heroSection
