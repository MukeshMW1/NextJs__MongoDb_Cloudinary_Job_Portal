'use client'
import React, { useState } from 'react'
import { MdOutlineFileUpload } from "react-icons/md";
const Form = ({id}) => {
    const [formData,setFormData] = useState({
name:'',
email:'',
phone:'',
jobId:'',
file:null
    })


    const handleChange  = (e) =>{
      const  {name,value,files} = e.target;
      if(name === 'file'){
setFormData({...formData,file:files[0]})
      }
      else
      {
        setFormData({...formData,[name]:value})
      }
      
    }


const handleSubmit = async (e) =>{
  e.preventDefault();
  const data = new FormData();
  data.append('name',formData.name);
  data.append('email',formData.email);
  data.append('jobId',id);
  data.append('phone',formData.phone);
  data.append('file',formData.file);


  try{

    const response = await fetch('http://localhost:3000/api/applications',{
      method:'POST',
      body:data
    })
    
    const result = await response.json();
    alert(result.message);
  }

  catch(err){
    console.log(err);
    alert('Error submitting form');
  }
}

  return (
    <div className='my-10 p-4 border border-gray-300 rounded-lg shadow-md shadow-amber-300 max-w-[100vw] mx-auto'>
    <h1 className='text-2xl font-bold text-center '>Apply for the job</h1>
    <form className='flex flex-col gap-4 mt-10 max-w-[600px] mx-auto' onSubmit={handleSubmit}>
        <input type="text" value={formData.name} name='name' onChange={handleChange} placeholder='Name' required className='p-2 border-2 border-gray-300 rounded-md'/>
        <input type="email" value={formData.email} name='email' onChange={handleChange} placeholder='Email' required className='p-2 border-2 border-gray-300 rounded-md'/>
        <input type="text" value={formData.phone} name='phone' onChange={handleChange} placeholder='Phone Number' required className='p-2 border-2 border-gray-300 rounded-md'/>
        
        <div className='flex items-center gap-4'>
          <input
            id="file-upload"
            type='file'
            name='file' required
            onChange={handleChange}
            accept='.pdf, .png, .docx, .jpg'
            className='hidden'
          />

          <label htmlFor="file-upload" className="cursor-pointer text-3xl text-gray-700 hover:text-blue-500">
            <MdOutlineFileUpload />
          </label>

          <span className="text-sm text-gray-900">
  {formData.file ? formData.file.name : "Upload your file"}
</span>
        </div>
        <button className='p-2 bg-gray-700 text-white font-bold cursor-pointer rounded-md'>Submit</button>
    </form> 
    </div>
  )
}

export default Form
