import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../services/AuthService'

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const userData = await login(email, password)
        if (userData.token) {
            localStorage.setItem('token', userData.token)
            navigate('/')
        }else{
            setError(userData.message)
        }
        
    } catch (error) {
        console.log(error)
        setError(error.message)
        setTimeout(()=>{
            setError('');
        }, 5000);
    }
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>Login</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800'/>
      </div>
      {error && <p className="error-message">{error}</p>}
      <input onChange={(e) => setEmail(e.target.value)} type="email" value={email} className='w-full px-3 py-2 border border-gray-800' placeholder='Email'required/>
      <input onChange={(e) => setPassword(e.target.value)} type="password" value={password} className='w-full px-3 py-2 border border-gray-800' placeholder='Password'required/>
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer'>Forgot your password?</p>
        <Link to='/register'><p className='cursor-pointer'>Create account</p></Link>
        
      </div>
      <button type='submit' className='bg-black text-white font-light px-8 py-2 mt-4'>Sign In</button>
    </form>
  )
}

export default Login
