import React from 'react'
import { IoSearch } from "react-icons/io5";

function Search() {
  return (
    <div className=' w-full p-2 border border-gray-200 bg-[#f1f1f1] flex items-center rounded-md shadow-md gap-3'>
        <IoSearch className='text-xl' />
        <input type='text' placeholder='Search products here..' className='w-full bg-inherit outline-none'></input>
      
    </div>
  )
}
 
export default Search