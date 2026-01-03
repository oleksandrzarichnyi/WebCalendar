import styles from './Toast.module.scss'
import CustomButton from '../Buttons/CustomButton.jsx'
import { useState, useEffect } from 'react'

export default function Toast({ onClose, isOpen }) {
  const [toastOpen, setToastOpen] = useState(isOpen)

  useEffect(() => {
    setToastOpen(isOpen);
  }, [isOpen]);

  if (!toastOpen) return null;

  function handleClose() {
    if (onClose) onClose();
    setToastOpen(false);
  }

  return (
    <div className={styles['container']}>
      <p className={styles['text']}>
        Event deleted
      </p>
      <CustomButton icon={'closeIcon'} onClick={handleClose} />
    </div>
  )
}