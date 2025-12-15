import styles from './Calendars.module.scss'
import CustomButton from '../../ui-kit/Buttons/CustomButton.jsx'
import Checkbox from '../../ui-kit/Checkbox/Checkbox.jsx'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getCalendars, addCalendar, deleteCalendar } from '../../api/calendarsApi.jsx'
import CreateCalendar from './CreateCalendar.jsx'
import { useState } from 'react'

export default function Calendars() {
  const queryClient = useQueryClient();
  const { data: calendars, isLoading } = useQuery({
    queryKey: ['calendars'],
    queryFn: getCalendars
  });

  const deleteCalendarMutation = useMutation({
    mutationFn: deleteCalendar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['calendars'] });
    }
  });

  const [isCreateShown, setIsCreateShown] = useState(false);
  const [isEditShown, setIsEditShown] = useState(false);
  const [currentCalendarId, setCurrentCalendarId] = useState('');

  function handleEdit(calendar) {
    setCurrentCalendarId(calendar.id);
    setIsEditShown(true);
  } 

  if (isLoading) return null;

  return (
    <>
      <div className={styles['container']}>
        <div className="flex justify-between relative">
          <h2 className={styles['title']}>My Calendars</h2>
          <CustomButton icon="addIconBlack" onClick={() => setIsCreateShown(true)} />
          <CreateCalendar 
            isShown={isCreateShown} 
            onClose={() => setIsCreateShown(false)}
            title="Create"
          />
        </div>
        <div className="flex flex-col gap-[8px] relative">
          {calendars.map((calendar) => (
            <div key={calendar.id} className={`${styles['calendar']} flex justify-between relative`}>
              <Checkbox text={calendar.title} color={calendar.color} />
              <div className={`${styles['buttons']} flex gap-[8px]`}>
                {calendars.length > 1 && <CustomButton icon="deleteIcon" onClick={() => deleteCalendarMutation.mutate(calendar.id)} />}
                <CustomButton 
                  icon="editIcon" 
                  onClick={() => handleEdit(calendar)} 
                />
              </div>
            </div>
          ))}
          <CreateCalendar 
            isShown={isEditShown} 
            title="Edit"
            onClose={() => setIsEditShown(false)}
            calendar={calendars.find(calendar => calendar.id === currentCalendarId)}
          />
        </div>
      </div>
    </>
  )
}