'use client'
import React, { useState } from 'react'
import FileUpload from './FileUpload'

const Form = ({ id }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    jobId: '',
  })

  const [file, setFile] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = new FormData()
    data.append('name', formData.name)
    data.append('email', formData.email)
    data.append('phone', formData.phone)
    data.append('jobId', id)
    data.append('file', file.info.secure_url) // use directly from file state

    try {
      const response = await fetch('https://next-js-mongo-db-job-portal.vercel.app/api/applications', {
        method: 'POST',
        body: data,
      })

      const result = await response.json()
      alert(result.message)
    } catch (err) {
      console.log(err)
      alert('Error submitting form')
    }
  }

  return (
    <div className="my-10 p-4 border border-gray-300 rounded-lg shadow-md shadow-amber-300 max-w-[100vw] mx-auto">
      <h1 className="text-2xl font-bold text-center">Apply for the job</h1>
      <form
        className="flex flex-col gap-4 mt-10 max-w-[600px] mx-auto"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          value={formData.name}
          name="name"
          onChange={handleChange}
          placeholder="Name"
          required
          className="p-2 border-2 border-gray-300 rounded-md"
        />
        <input
          type="email"
          value={formData.email}
          name="email"
          onChange={handleChange}
          placeholder="Email"
          required
          className="p-2 border-2 border-gray-300 rounded-md"
        />
        <input
          type="text"
          value={formData.phone}
          name="phone"
          onChange={handleChange}
          placeholder="Phone Number"
          required
          className="p-2 border-2 border-gray-300 rounded-md"
        />

        <div className="flex items-center justify-center gap-4">
          <FileUpload setFile={setFile} />
          {file && (
            <span className="text-sm text-gray-900">
              <strong>{file?.info?.original_filename || 'File uploaded'}</strong>
            </span>
          )}
        </div>

        <button className="p-2 bg-gray-700 text-white font-bold cursor-pointer rounded-md">
          Submit
        </button>
      </form>
    </div>
  )
}

export default Form
