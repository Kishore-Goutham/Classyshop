import React from 'react'
import { FaAngleUp } from "react-icons/fa";
import Button from '@mui/material/Button';
import { FaAngleDown } from "react-icons/fa";



function Qtybox({qty,setQty}) {
   
    
    const minusqty = ()=>{
        if(qty>1){
            setQty(Number(qty)-1)
        }
    }
  return (
    <div className='flex items-center'>
        Qty:&nbsp;<input type='number' value={qty} onChange={(e)=>setQty(e.target.value)} className='w-[50px] h-10 outline-none text-center border border-[rgba(0,0,0,0.2)] rounded-md'></input>
        <div className='flex flex-col justify-between h-9'>
        <Button className='!min-w-[8px] !h-4 !text-black'><FaAngleUp onClick={()=>setQty(Number(qty)+1)} className='opacity-55'/></Button>
        <Button className='!min-w-[8px] !h-4 !text-black'><FaAngleDown onClick={minusqty} className='opacity-55' /></Button>
        </div> 
    </div>
  )
}

export default Qtybox