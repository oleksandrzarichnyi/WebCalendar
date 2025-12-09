import styles from './Calendars.module.scss'
import CustomButton from '../../ui-kit/Buttons/CustomButton.jsx'
import Checkbox from '../../ui-kit/Checkbox/Checkbox.jsx'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getCalendars, addCalendar } from '../../api/calendarsApi.jsx'
import CreateCalendar from './CreateCalendar.jsx'

export default function Calendars() {
  const queryClient = useQueryClient();
  const { data: calendars, isLoading } = useQuery({
    queryKey: ['calendars'],
    queryFn: getCalendars
  });

  const addNewCalendar = useMutation({
    mutationFn: addCalendar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['calendars'] });
    }
  });

  if (isLoading) return null;

  return (
    <>
      <div className={styles['container']}>
        <div className="flex justify-between">
          <h2 className={styles['title']}>My Calendars</h2>
          <CustomButton icon="addIconBlack" onClick={() => addNewCalendar.mutate({ title: 'test3', color: 'orange' })} />
        </div>
        <div className="flex flex-col gap-[22px]">
          {calendars.map((calendar) => (
            <Checkbox key={calendar.id} text={calendar.title} color={calendar.color} />
          ))}
        </div>
      </div>
      <CreateCalendar />
    </>
  )
}