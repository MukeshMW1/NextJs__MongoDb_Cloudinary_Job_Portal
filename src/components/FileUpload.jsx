'use client'
import React from 'react';
import { MdOutlineFileUpload } from "react-icons/md";
import { CldUploadButton } from 'next-cloudinary';
import cloudinaryConfig from '@/libs/cloudinary';

const FileUpload = ({setFile}) => {
  return (
    <div>
      <CldUploadButton
        options={{
          cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        }}
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
        onSuccess={(result) =>{

            setFile(result);
            console.log(result);
    }   
    }
      >
        <div className='flex gap-2 items-center justify-center text-amber-500 font-bold p-2 border-2 border-gray-300 rounded-md shadow-md shadow-amber-300 hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer'>
        <MdOutlineFileUpload size={30}/>
            
        </div>
      </CldUploadButton>
    </div>
  );
};

export default FileUpload;
