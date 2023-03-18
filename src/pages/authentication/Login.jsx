import React, { useState } from 'react'
import bgImage from '../../assets/images/bg.jpg'
import styles from '../authentication/styles/Login.module.css'
import AuthenticationButton from './auth-components/AuthButton'
import AuthInputField from './auth-components/Input'
import { Link } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [formErrors, setFormErrors] = useState({})
  const [formIsValid, setFormIsValid] = useState(false)

  const validateForm = () => {
    let errors = {}
    let isValid = true

    if (!email) {
      errors.email = 'Email is required'
      isValid = false
    }

    if (!password) {
      errors.password = 'Password is required'
      isValid = false
    }

    setFormErrors(errors)
    setFormIsValid(isValid)

    return isValid
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      // Do something with the form data
    } else {
      console.log('Form is invalid')
    }
  }

 const handleEmailChange = (event) => {
   setEmail(event.target.value)
 }

 const handlePasswordChange = (event) => {
   setPassword(event.target.value)
 }

  return (
    <div className={styles['auth-container']}>
      <img
        className={styles['auth-image']}
        src={bgImage}
        alt='Login Background'
      />
      <div className={styles['auth-form']}>
        <form onSubmit={handleSubmit} className={styles['auth-card']}>
          <h2 className={styles['auth-title']}>Welcome</h2>
          <AuthInputField
            label='Email Address'
            type='email'
            name='email'
            id='email'
            value={email}
            onChange={handleEmailChange}
          />
          {formErrors.password && (
            <span className={styles['auth-error']}>{formErrors.email}</span>
          )}
          <AuthInputField
            label='Password'
            type='password'
            name='password'
            id='password'
            value={password}
            onChange={handlePasswordChange}
          />
          {formErrors.password && (
            <span className={styles['auth-error']}>{formErrors.password}</span>
          )}
          <p className={styles['auth-link']}>
            <Link to='/forgot-password'>Forgot Password?</Link>
          </p>
      <AuthenticationButton disabled={!formIsValid}
        title='Login'/>
          <div className={styles['auth-text']}>
            <p>Don't have an account?</p>
            <p className='ml-2'>
              <Link to='/register'>Register</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
