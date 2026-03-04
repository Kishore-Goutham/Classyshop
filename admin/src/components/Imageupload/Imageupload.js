import React from 'react'
import { FaRegImages } from "react-icons/fa";

function Imageupload(props) {
  return (
    <div className='w-full h-[170px] relative mt-3 rounded-md border border-dashed border-black bg-gray-200 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-300'>
          <FaRegImages className='text-[40px]'/>
          <h1 className='font-light'>Upload Image</h1>
          <input type='file'  accept="image/*" name='images' multiple={props?.multiple? true:false} onChange={props.handleImageChange} required  className='absolute top-0 left-0 w-full h-full cursor-pointer opacity-0'></input>
    </div>
  )
}

export default Imageupload