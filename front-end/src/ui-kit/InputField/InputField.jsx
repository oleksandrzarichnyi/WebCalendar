import styles from './InputField.module.scss'
import { useState } from 'react'
import { Field, ErrorMessage } from 'formik'
import CustomButton from '../Buttons/CustomButton.jsx'

export default function InputField({ type, placeholder, title, name, errors, touched, height = '52px', width }) {
  const [showPassword, setShowPassword] = useState(false);

  const passwordIcon = showPassword ? 'passwordShownIcon' : 'passwordHiddenIcon';
  const inputType = showPassword === true ? 'text' : 'password';

  return (
    <>
      <label className={`relative flex flex-col leading-none max-w-[300px] h-[${height}] w-[${width}]`}>
        <span className={styles['field-title']}>{title}</span>
        <div className="flex">
          <Field type={`${type === 'password' ? inputType : 'text'}`} name={name} className={styles['field-input']} placeholder={placeholder}></Field>
          {type === 'password' && <CustomButton type="button" icon={`${passwordIcon}`} onClick={() => setShowPassword(prev => !prev)} />}
        </div>
        <div className={`${styles['field-underline']} ${errors[name] && touched[name] ? styles['field-underline--error'] : ""}`}></div>
        <ErrorMessage name={name} component="p" className={styles['error-message']}></ErrorMessage>
      </label>
    </>
  )
}