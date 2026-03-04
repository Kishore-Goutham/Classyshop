import React from 'react'
import 'react-inner-image-zoom/lib/styles.min.css';


function Productzoom({img}) {
  return (
   <div className='w-[100%] rounded-lg overflow-hidden'>
       <img src={img} alt='' className='w-full hover:scale-125 duration-300'></img>
   </div>
  )
}

export default Productzoom