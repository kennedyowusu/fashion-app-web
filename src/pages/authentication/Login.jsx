import React from 'react'
import bgImage from '../../assets/images/bg.jpg'

const Login = () => {
  return (
    <div className='relative w-full h-screen bg-zinc-900/90'>
      <img
        className='absolute w-full h-full object-cover mix-blend-overlay'
        src={bgImage}
        alt='Login Background'
      />

      <div className='flex justify-center items-center h-full'>
        <form action='' className='max-w-[400px] mx-auto bg-white p-8'>
          <h2 className='text-4xl font-bold text-center py-4 mb-2'>Welcome</h2>
          <div className='flex flex-col mb-4'>
            <label htmlFor='email' className='text-black mb-1'>
              Email Address
            </label>
            <input
              className='border relative bg-gray-100 p-2'
              type='email'
              name='email'
              id='email'
            />
          </div>

          <div className='flex flex-col mb-2'>
            <label htmlFor='password' className='text-black mb-1'>
              Password
            </label>
            <input
              className='border relative bg-gray-100 p-2'
              type='password'
              name='password'
              id='password'
            />
      </div>
      <p className='
        text-right text-gray-500 text-sm mt-2
      '>
        <a href='/forgot-password'>Forgot Password?</a>
      </p>
   

          <button
            className='w-full py-3 mt-4 bg-teal-700 hover:bg-teal-400 relative text-white font-bold'
            type='submit'
          >
            Login
          </button>
          <div className='flex text-center text-gray-500 text-sm mt-4'>
            <p className=''>Don't have an account?</p>
            <p className='ml-2'>
              <a href='/register'>Register</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
