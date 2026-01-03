import styles from './DeleteEvent.module.scss'
import CustomButton from '../../ui-kit/Buttons/CustomButton'

export default function DeleteEvent({ isOpen, onClose, onDelete, eventData }) {
  return (
    <>
      {isOpen ?
        <div className={styles['container']}>
          <h2 className={styles['title']}>Delete Event</h2>
          <div className="w-full h-[1px] bg-[#DEDFE5] my-[16px]"></div>
          <p className={styles['text']}>
            Are you sure you want to delete Event {eventData.title}? You'll no longer have access to it. 
          </p>
          <div className="flex justify-end gap-[8px] mt-[16px]">
            <CustomButton onClick={onClose} variant="secondary" width="80px" text="Cancel" />
            <CustomButton onClick={() => {onDelete(); onClose()}} variant="primary" width="80px" text="Delete" />
          </div>
        </div>
        : null
      }
    </>
  )
}