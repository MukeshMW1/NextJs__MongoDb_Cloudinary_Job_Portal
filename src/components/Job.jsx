'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineAccessTime } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { CiStar } from "react-icons/ci";
const Job = ({job}) => {
    const [fav,setFav] = useState(job.favorite);



    const handleClick = async (id) => {
      const updateFav = !fav;
      setFav(updateFav);
    
      try {
        await fetch(`https://next-js-mongo-db-job-portal.vercel.app/api/jobs/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ favorite: updateFav }),
        });
      } catch (err) {
        console.error("Error updating favorite:", err);
        setFav(fav); // optional revert
      }
    };


    
  return (
    <>
    <div className='border-2 border-gray-300 rounded-lg  flex justify-between items-center my-10 p-8 shadow-md shadow-amber-300 hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out  '>
      <div className="">
<h2 className='font-bold text-[20px]'>{job?.title}</h2>

<p className='flex  gap-2  items-center text-gray-900 text-base'><FaLocationDot /> <span className='text-gray-700 font-bold'>
    Remote
    </span>
     </p>
<p className='flex  gap-2  items-center text-gray-900 text-base'><MdOutlineAccessTime /><span className='flex gap-2 items-center text-gray-700 font-bold'>
<FaPlus size={10}/>
     2
    </span>
     </p>


      </div>
      <div className="flex gap-4 items-center">
        <button onClick={()=>handleClick(job?._id)} className='text-amber-500  '>
      {fav ?<FaStar size={24} />:<CiStar size={24} />}
      </button>
      <Link  href={`/applyJob/${job?._id}`} className='p-2 font-bold bg-gray-700 text-white rounded-md shadow-md '>
     Apply
    </Link>

      </div>
      
    </div>
    
    </>
  )
}

export default Job
