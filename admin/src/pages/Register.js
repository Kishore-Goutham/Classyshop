import React from 'react'
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';
import { FcGoogle } from "react-icons/fc";

function Register() {
  return (
    <section>
        <div className='w-[80%] md:w-[30%] m-auto bg-white p-4 my-10 shadow-lg rounded-md'>
            <h1 className='text-center text-xl font-semibold'>Register your account</h1>
            <form className='mt-4'>
               
                <TextField id="name" type='name' label="Name" variant="outlined" required className='w-full' />

                <div className='mt-5'>
               <TextField id="email" type='email' label="Email" variant="outlined" required className='w-full' />
               </div>

               <div className='mt-5'>
               <TextField id="passowrd" label="Password" type='password' variant="outlined" required className='w-full' />
               </div>
               
               <button type='submit' className='mt-4 text-white text-center w-full py-2 rounded-md bg-[#ff5252]'>Signup</button>

                <p className='mt-4 text-center'>Already have an account?<Link to={"/login"} className='text-[#ff5252] hover:underline font-semibold'>Login</Link></p>
                 <p className='text-center mt-3 mb-2'>or</p>  
                <Button className='gap-3 w-full !bg-[#f1f1f1] text-center !font-semibold !text-black'><FcGoogle className='!text-xl'/>Login with Google</Button>
               
            </form>
        </div>

   </section>
  )
}

export default Register