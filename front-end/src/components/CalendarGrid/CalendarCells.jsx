import styles from './CalendarCells.module.scss'
import { TIME_HOURS } from './TIME_HOURS'
import { useQuery } from '@tanstack/react-query'
import { getCalendars } from '../../api/calendarsApi'
import { useMemo } from 'react';

export default function CalendarCells() {
  const { data: calendars } = useQuery({
    queryKey: ['calendars'],
    queryFn: getCalendars
  });
 
  const eventsData = useMemo(() => {
    if (!calendars) return [];
    
    return calendars.map(calendar => ({
      calendarId: calendar.id,
      color: calendar.color,
      events: calendar.events
    }));
  }, [calendars]);

  const hexToRgba = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const toMinutes = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const eventHeight = (time) => {
    const start = toMinutes(time[0]);
    const end = toMinutes(time[1]);

    return `${((end - start) / 15) * 20}px`;
  };
  
  const topMargin = (time) => 20 * (time / 15);

  return (
    <>
      {TIME_HOURS.map((hour) => (
        <div key={hour} className={`${styles['cell']} relative`}>
          <p className={`absolute ${hour === '00:00' ? 'left-[-53px]' : 'top-[-9px] left-[-53px]'}`}>{hour}</p>
          {eventsData.map(eventObj => {
            return eventObj.events.map(event => 
              event.time[0].slice(0, 2).includes(hour.slice(0, 2)) ? 
                <div 
                  key={event.id}
                  className={`${styles['event']} absolute z-30`}
                  style={{ top: `${topMargin(event.time[0].slice(3))}px` }}
                >
                  <div 
                    style={{ backgroundColor: eventObj.color, height: eventHeight(event.time) }} 
                    className={styles['event-line']}
                  ></div>
                  <div 
                    style={{ backgroundColor: hexToRgba(eventObj.color, 0.3), height: eventHeight(event.time) }} 
                    className={styles['event-info']}
                  >
                    <p className={styles['event-title']}>{`${event.title}, ${event.time[0]} - ${event.time[1]}`}</p>
                  </div>
                </div>
            : null
            )
          })}
         </div>
        )
      )}
    </>
  )
}