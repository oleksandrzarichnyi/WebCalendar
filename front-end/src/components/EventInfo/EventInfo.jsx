import styles from './EventInfo.module.scss'
import CustomButton from '../../ui-kit/Buttons/CustomButton'
import icons from '../../ui-kit/icons/icons'

export default function EventInfo({ isOpen, calendarData, eventData, onClose, onEdit }) {
  const eventDate = (date) => {
    if (!date) return '';
    if (date === 'Not selected') return;

    const input = new Date(date.replace(/-/g, ' '));

    const formatted = new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    }).format(input);

    return formatted;
  }

  return (
    <>
      {isOpen ?
        <div className={styles['container']}>
          <div className="flex justify-between">
            <h2 className={styles['title']}>Event information</h2>
            <div className="flex gap-[24px]">
              <CustomButton onClick={onEdit} icon="editIcon" />
              <CustomButton icon="deleteIcon" />
              <CustomButton onClick={onClose} icon="closeIcon" />
            </div>
          </div>
          <div className="w-full h-[1px] bg-[#DEDFE5] my-[16px]"></div>
          <div className="flex flex-col gap-[24px] leading-none">
            <div className="flex gap-[16px] items-center">
              <img src={icons['titleIcon']} alt="" />
              <p className={styles['event-title']}>{eventData.title}</p>
            </div>
            <div className="flex gap-[16px] items-center">
              <img src={icons['clockIcon']} alt="" />
              <p className={styles['event-text']}>{`${eventDate(eventData.date)}, ${eventData.time[0]} - ${eventData.time[1]}`}</p>
            </div>
            <div className="flex gap-[16px] items-center">
              <img src={icons['calendarIcon']} alt="" />
              <p className={styles['event-text']}>{calendarData.title}</p>
            </div>
            <div className="flex gap-[16px] items-center">
              <img src={icons['descriptionIcon']} alt="" />
              <p className={styles['event-text']}>{eventData.desc}</p>
            </div>
          </div>
        </div>
        : null
      }
    </>
  )
}