import { useCallback, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../../redux/slices/authentication/login'
import AuthInputField from '../authentication/auth-components/Input'
import AuthenticationButton from '../authentication/auth-components/AuthButton'
import bgImage from '../../assets/images/bg.jpg'
import styles from '../authentication/styles/Login.module.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const formIsValid = useMemo(() => {
    return !emailError && !passwordError
  }, [emailError, passwordError])

  const handleEmailChange = useCallback((event) => {
    setEmail(event.target.value)
    setEmailError(event.target.value ? '' : 'Email is required')
  }, [])

  const handlePasswordChange = useCallback((event) => {
    setPassword(event.target.value)
    setPasswordError(event.target.value ? '' : 'Password is required')
  }, [])

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault()

      // check if inputs are not empty
      if (!email || !password) {
        setEmailError(email ? '' : 'Email is required')
        setPasswordError(password ? '' : 'Password is required')
        return
      }

      setEmail('')
      setPassword('')
      setLoading(true)

      if (formIsValid) {
        dispatch(loginUser({ email, password }))
          .then((response) => {
            console.log(response)
            setLoading(false)
            if (response.payload && response.payload.data.access_token) {
              localStorage.setItem('token', response.payload.data.access_token)
              navigate('/')
            } else {
              console.log('Invalid response')
            }
          })
          .catch((error) => {
            setLoading(false)
            console.log('Error occurred: ', error)
            // set an error message or handle the error in some other way
          })
      } else {
        console.log('Form is not valid')
      }
    },
    [
      dispatch,
      email,
      password,
      formIsValid,
      navigate,
      setEmailError,
      setPasswordError,
    ]
  )

  return (
    <div className={styles['auth-container']}>
      <img
        className={styles['auth-image']}
        src={bgImage}
        alt='Login Background'
      />
      <div className={styles['auth-form']}>
        <form onSubmit={handleSubmit} className={styles['auth-card']}>
          <h2 className={styles['auth-title']}>Login into your Account</h2>
          <div>
            <label htmlFor='email'>Email Address</label>
            <AuthInputField
              type='email'
              name='email'
              id='email'
              value={email}
              onChange={handleEmailChange}
            />
            {emailError && (
              <span className={styles['auth-error']}>{emailError}</span>
            )}
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <AuthInputField
              type='password'
              name='password'
              id='password'
              value={password}
              onChange={handlePasswordChange}
            />
            {passwordError && (
              <span className={styles['auth-error']}>{passwordError}</span>
            )}
          </div>
          <AuthenticationButton
            disabled={!formIsValid}
            title='Login'
            loading={loading}
          />
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
