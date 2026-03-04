import React from 'react'
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';
import { FcGoogle } from "react-icons/fc";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { toast } from "react-toastify";

function ForgetPassword(){
  let navigate = useNavigate()
  let [formfields,setFormfields] = useState({email:"",password:"",});

  return (
    <section className='flex justify-center h-screen'>
        <div className='w-[80%] md:w-[30%]  bg-white p-4 my-auto shadow-lg rounded-md'>
            <h1 className='text-center text-xl font-semibold'>Reset your password</h1>
            <form className='mt-4'>
               <TextField id="email" type='email' label="Email" variant="outlined" required className='w-full' />
               
    
               
               <button type='submit' className='mt-4 text-white text-center w-full py-2 rounded-md bg-[#ff5252]'>Reset Password</button>

                <p className='mt-4 text-center'>Remembered password?<Link to={"/login"} className='text-[#ff5252] hover:underline font-semibold'>Login here</Link></p>
              
            </form>
        </div>

   </section>
  )
}

export default ForgetPassword