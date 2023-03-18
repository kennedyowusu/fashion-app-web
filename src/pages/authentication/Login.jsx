import React from 'react'
import bgImage from '../../assets/images/bg.jpg'
import styles from '../authentication/styles/Login.module.css'

const Login = () => {
 return (
  <div className={styles['login-container']}>
   <img
    className={styles['login-image']}
    src={bgImage}
    alt='Login Background'
   />

   <div className={styles['login-form']}>
    <form action='' className={styles['login-card']}>
     <h2 className={styles['login-title']}>Welcome</h2>
     <div className='flex flex-col mb-4'>
      <label htmlFor='email' className={styles['login-label']}>
       Email Address
      </label>
      <input
       className={styles['login-input']}
       type='email'
       name='email'
       id='email'
      />
     </div>

     <div className='flex flex-col mb-2'>
      <label htmlFor='password' className={styles['login-label']}>
       Password
      </label>
      <input
       className={styles['login-input']}
       type='password'
       name='password'
       id='password'
      />
     </div>
     <p className={styles['login-link']}>
      <a href='/forgot-password'>Forgot Password?</a>
     </p>

     <button
      className={styles['login-button']}
      type='submit'
     >
      Login
     </button>
     <div className={styles['login-text']}>
      <p>Don't have an account?</p>
      <p className='ml-2'>
       <a href='/register'>Register</a>
      </p>
     </div>
    </form>
   </div>
  </div>
 );
}

export default Login
