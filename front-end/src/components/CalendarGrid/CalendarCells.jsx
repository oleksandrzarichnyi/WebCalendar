import styles from './CalendarCells.module.scss'
import { TIME_HOURS } from './TIME_HOURS'
import { useQuery } from '@tanstack/react-query'
import { getCalendars } from '../../api/calendarsApi'
import { useMemo, useState, useEffect } from 'react'
import CreateEvent from '../CreateEvent/CreateEvent.jsx'
import { useEventStore } from '../../hooks/useEventStore.jsx'
import { useDateStore } from '../../hooks/useDateStore.jsx'
import { useCalendarStore } from '../../hooks/useCalendarStore.jsx'
import EventInfo from '../EventInfo/EventInfo.jsx'

export default function CalendarCells() {
  const { data: calendars } = useQuery({
    queryKey: ['calendars'],
    queryFn: getCalendars
  });
 
  const eventsData = useMemo(() => {
    if (!calendars) return [];
    
    return calendars.map(calendar => ({
      id: calendar.id,
      color: calendar.color,
      events: calendar.events,
      title: calendar.title
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

    return `${((end - start) / 15) * 20}`;
  };
  
  const topMargin = (time) => 20 * (time / 15);

  const [isCreateEvent, setIsCreateEvent] = useState(false);

  const { setStoredEventDate } = useEventStore();
  const { storedSelectedDate } = useDateStore();

  function handleEventInfo(event, calendar) {
    setIsEventInfo(prev => !prev);
    setStoredEventDate(event.date !== 'Not selected' ? event.date : '');
    setSelectedEvent(event);
    setSelectedCalendar(calendar);
  }

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedCalendar, setSelectedCalendar] = useState(null);

  const [isEventInfo, setIsEventInfo] = useState(false);

  const { storedCalendars } = useCalendarStore();

  return (
    <>
      <div className="absolute left-[40%] top-[30%] z-30 flex flex-col gap-[30px]">
        <EventInfo 
          isOpen={isEventInfo}
          onClose={() => setIsEventInfo(prev => !prev)}
          eventData={selectedEvent}
          calendarData={selectedCalendar}
          onEdit={() => {
            setIsCreateEvent(prev => !prev);
            setIsEventInfo(prev => !prev);
          }}
        />
        <CreateEvent 
          onClose={setIsCreateEvent} 
          title="Edit" 
          eventData={selectedEvent}
          calendarData={selectedCalendar}
          isOpen={isCreateEvent} 
        />
      </div>
      {TIME_HOURS.map((hour) => (
        <div key={hour} className={`${styles['cell']} relative`}>
          <p className={`absolute ${hour === '00:00' ? 'left-[-53px]' : 'top-[-9px] left-[-53px]'}`}>{hour}</p>
          {eventsData.map(eventObj => {
            return eventObj.events.map(event => 
              event.time[0].slice(0, 2).includes(hour.slice(0, 2)) 
              && storedCalendars.find(c => c.id === eventObj.id)?.isDisplayed 
              && event.date === storedSelectedDate ?
                <div key={event.id}>
                  <div
                    className={`${styles['event']} absolute z-20`}
                    style={{ top: `${topMargin(event.time[0].slice(3))}px` }}
                    onClick={() => handleEventInfo(event, eventObj)}
                  >
                    <div 
                      style={{ backgroundColor: eventObj.color, height: `${eventHeight(event.time)}px` }} 
                      className={styles['event-line']}
                    ></div>
                    <div 
                      style={{ backgroundColor: hexToRgba(eventObj.color, 0.3), height: `${eventHeight(event.time)}px` }} 
                      className={`${styles['event-info']} ${eventHeight(event.time) > 20 ? styles['event-info--padding'] : ''}`}
                    >
                      <p className={`${eventHeight(event.time) > 40 ? styles['event-text-wrap'] : ''}`}>
                        <span className={styles['event-title']}>{`${event.title}, `}</span> 
                        <span className={styles['event-time']}>{`${event.time[0]} - ${event.time[1]}`}</span>
                      </p>
                    </div>
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