import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between items-center p-4 px-8 py-9 border rounded-xl shadow-lg shadow-amber-900 bg-white/10 backdrop-blur-md border-white/40'>
      <Link href='/' className='font-bold not-open:text-[20px] '>MW</Link>
      <Link href='/favorites' className='text-amber-500 font-bold not-open:text-[20px]'>Favorites</Link>
      <button className='p-2 text-gray-950 border  rounded-xl hover:scale-105 transition-all duration-[90px] font-bold '>Apply Now</button>
      

    </nav>
  )
}

export default Navbar
