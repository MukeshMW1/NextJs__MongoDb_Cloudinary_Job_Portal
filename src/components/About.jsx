'use client'
import React, { useEffect, useState } from 'react'

const About = ({id}) => {


const [job,setJob] = useState();



useEffect( ()=>{
  if (!id) return;

  const fetchJob =async () =>{

    const res= await fetch(`https://next-js-mongo-db-job-portal.vercel.app/api/jobs/${id}`);
    const data = await res.json();
    console.log(data.jobs);
    setJob(data.job);
  }
  fetchJob();
},[id])


  return (
    <div className='m-10 p-4 border max-w-[100vw] border-gray-300 rounded-lg shadow-md shadow-amber-300  mx-auto'>
      <h1 className='text-center font-bold text-[20px]'>{job?.title}</h1>
      <div className="">
        <p className='text-gray-900 text-base font-bold'>About the Job</p>
        <p className='text-gray-700 text-base'>{job?.description}</p>

        <div className="mt-4">

        <p className='font-bold '>Requirements :</p>
        <ul className='list-disc list-inside text-[14px] text-gray-700'>
        {job?.requirements.map((requirement,i)=>{
          return(
            <li key={i}>{requirement}</li>
          )
        })}
        </ul>
        </div>

<div className="mt-4">
    <p className='font-bold '>Perks : </p>
    <ul className='list-disc list-inside text-[14px] text-gray-700'>
      {job?.perks.map((perk,i)=>(
        <li key={i}>{perk}</li>
      ))
        }
          </ul>
        </div>

        <div className="mt-4">
            <p className='font-bold '>Salary :</p>
            <p className='text-gray-700 text-[14px]'>{job?.salary}</p>
        </div>

      </div>
    </div>
  )
}

export default About
