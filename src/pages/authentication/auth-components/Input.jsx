import styles from '../styles/Login.module.css'

const AuthInputField = ({ label, type, id, name, value, onChange }) => {
  return (
    <div className='flex flex-col mb-4'>
      <label htmlFor={id} className={styles['auth-label']}>
        {label}
      </label>
      <input
        className={styles['auth-input']}
        type={type}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}


export default AuthInputField
