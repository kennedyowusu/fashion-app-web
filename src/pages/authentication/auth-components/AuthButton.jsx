import styles from '../styles/Login.module.css'

const AuthenticationButton = ({ disabled, title }) => {
  return (
    <button
      className={styles['auth-button']}
      type='submit'
      disabled={!disabled}
    >
      {title}
    </button>
  )
}
export default AuthenticationButton
