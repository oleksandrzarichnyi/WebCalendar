import styles from './EventInfo.module.scss'
import CustomButton from '../../ui-kit/Buttons/CustomButton'
import icons from '../../ui-kit/icons/icons'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteEvent } from '../../api/calendarsApi'
import DeleteEvent from '../DeleteEvent/DeleteEvent'
import { useState } from 'react'
import { parseEventDate } from '../../utils/dateFormatters'

export default function EventInfo({ isOpen, calendarData, eventData, onClose, onEdit }) {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries(['calendars']);
    }
  });

  function handleDelete(calendarId, eventId) {
    deleteMutation.mutate({
      calendarId: calendarId,
      eventId: eventId,
    });
    onClose();
  }

  const [isDelete, setIsDelete] = useState(false);

  return (
    <>
      {isOpen ?
        <div className={`${styles['container']} relative`}>
          <div className="flex justify-between">
            <h2 className={styles['title']}>Event information</h2>
            <div className="flex gap-[24px]">
              <CustomButton onClick={onEdit} icon="editIcon" />
              <CustomButton onClick={() => setIsDelete(prev => !prev)} icon="deleteIcon" />
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
              <p className={styles['event-text']}>{`${parseEventDate(eventData.date)}, ${eventData.time[0]} - ${eventData.time[1]}`}</p>
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
          <div className="absolute top-[15%] left-0">
            <DeleteEvent 
              isOpen={isDelete} 
              eventData={eventData}
              onClose={() => setIsDelete(prev => !prev)}
              onDelete={() => handleDelete(calendarData.id, eventData.id)}
            />
          </div>
        </div>
        : null
      }
    </>
  )
}