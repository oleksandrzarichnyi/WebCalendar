import styles from './Checkbox.module.scss'
import { useState } from 'react'

export default function Checkbox({ text, textLeft, isChecked, onChange }) {
  const [checked, setChecked] = useState(isChecked);

  function handleChange() {
    if (onChange) onChange();
    setChecked(prev => !prev);
  }

  return (
    <label className={styles['container']}>
      <span>{textLeft}</span>
      <input 
        type="checkbox" 
        className={styles['checkbox-to-hide']} 
        checked={isChecked && checked}
        onChange={handleChange}
      />
      <span className={styles['checkbox-to-display']}></span>
      <span>{text}</span>
    </label>
  )
}