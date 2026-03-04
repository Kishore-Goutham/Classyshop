import React from 'react'
import { Link } from 'react-router-dom'

function Adsbannerbox({img}) {
  return (
    <div className='w-[100%] h-[200px] md:h[250px] overflow-hidden rounded-md'>
        <Link> <img src={img} alt='' className='h-full min-w-full hover:scale-110 duration-300'></img></Link>
    </div>
  )
}

export default Adsbannerbox