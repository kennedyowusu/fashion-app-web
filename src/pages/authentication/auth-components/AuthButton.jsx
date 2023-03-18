import Spinner from '../../../components/Spinner'
import styles from '../styles/Login.module.css'

const AuthenticationButton = ({ disabled, title, loading }) => {
  return (
    <button className={styles['auth-button']} type='submit' disabled={disabled}>
      {loading ? <Spinner /> : title}
    </button>
  )
}
export default AuthenticationButton
