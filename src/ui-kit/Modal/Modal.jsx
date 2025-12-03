import styles from './Modal.module.scss'
import '../../styles/main.scss'
import CustomButton from '../Buttons/CustomButton.jsx'
import { useState, useEffect } from 'react'

export default function Modal({ title, text, onClose, width, height, maxWidth, maxHeight, isOpen }) {
  const [modalOpen, setModalOpen] = useState(isOpen);

  useEffect(() => {
    setModalOpen(isOpen);
  }, [isOpen]);

  if (!modalOpen) return null;

  function handleClose() {
    if (onClose) onClose();
    setModalOpen(false);
  }

  return (
    <>
      <div 
        className={`${styles['container']}`}
        style={{width: width, height: height, maxWidth: maxWidth, maxHeight: maxHeight}}
      >
        <div className="flex justify-between items-center">
          <h2 className={styles['title']}>{title}</h2>
          <CustomButton icon={'closeIcon'} onClick={handleClose} />
        </div>
        <div className={styles['separation-line']}></div>
        <div className={styles['text-container']}>
          {text}
        </div>
      </div>
    </>
  )
}