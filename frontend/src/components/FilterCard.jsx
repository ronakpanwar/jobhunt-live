import React, { useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'

const filterData = [
    {
       filterType:"Location",
       array:["Mumbai" ,"Delhi" , "Pune" , "Indore"]
    },
    {
        filterType:"Industry",
        array:["Frontend Developer" ,"Backend Developer" , "Data Science" , "Graphic Designer"]
     },
     {
        filterType:"Salary",
        array:["0-10k" ,"10-25k" , "25-50k" , "50-1L" , "above 1L"]
     },
]

const FilterCard = () => {

  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible);
  };
  return (
    <div className="p-3 rounded-md w-full bg-white">
      {/* Filter Button for Small Screens */}
      <div className="flex justify-between items-center md:hidden">
        <h1 className="text-lg font-bold">Filter Jobs</h1>
        <button
          onClick={toggleFilterVisibility}
          className="text-blue-600 font-medium border border-blue-600 px-3 py-1 rounded-md hover:bg-blue-100"
        >
          {isFilterVisible ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      {/* Filter List */}
      <div
        className={`${
          isFilterVisible ? "block" : "hidden"
        } md:block mt-3 transition-all`}
      >
        <RadioGroup>
          {filterData.map((e, index) => (
            <div key={index} className="mb-4">
              <h1 className="text-black font-bold text-lg">{e.filterType}</h1>
              {e.array.map((item, index) => (
                <div key={index} className="flex items-center gap-2 ml-2 text-sm text-gray-700">
                  <RadioGroupItem value={item} />
                  <label>{item}</label>
                </div>
              ))}
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  )
}

export default FilterCard
