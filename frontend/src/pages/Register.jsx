import React from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <form className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>Sign Up</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800'/>
      </div>
      <input type="text" className='w-full px-3 py-2 border border-gray-800' placeholder=' First Name'required/>
      <input type="text" className='w-full px-3 py-2 border border-gray-800' placeholder=' Last Name'required/>
      <input type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='Email'required/>
      <input type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='Password'required/>
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <Link to='/login' className='cursor-pointer ml-auto'><p>Login Here</p></Link>
      </div>
      <button className='bg-black text-white font-light px-8 py-2 mt-4'>Sign Up</button>
    </form>
  )
}

export default Register