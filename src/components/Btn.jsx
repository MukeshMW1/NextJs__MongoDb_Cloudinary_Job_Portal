import React from 'react'

const Btn = ({title, onClick, disabled}) => {
  return (
    <button className={`bg-gray-900 cursor-pointer text-white  hover:bg-gray-700  font-bold py-2 px-4 rounded ${disabled?'cursor-not-allowed':''}`} onClick={onClick} disabled={disabled}>
      {title}
    </button>
    
  )
}

export default Btn
