import styles from './DatePicker.module.scss'
import { useDateStore } from '../../hooks/useDateStore'
import { MONTHS } from './MONTHS.jsx';
import { useEffect } from 'react';
import { useEventStore } from '../../hooks/useEventStore.jsx';

export function MapDays({ monthIndex, setMonthIndex, selectedDate, setSelectedDate, month, setCurrentYear, currentYear, useStore }) {
  const neededDays = () => 39 - MONTHS[monthIndex].days.length;

  const { setStoredSelectedDate, storedSelectedDate } = useDateStore();
  const { storedEventDate, setStoredEventDate } = useEventStore();

  if (useStore === 'Date') {
    useEffect(() => {
      setSelectedDate(storedSelectedDate);
    }, [storedSelectedDate])
  } else {
    useEffect(() => {
      setSelectedDate(storedEventDate);
    }, [storedEventDate])
  }

  const currentMonth = 
    month === 'current' 
      ? MONTHS[monthIndex]
      :
    month === 'next'
      ? MONTHS[monthIndex + 1] || MONTHS[0]
      :
    month === 'prev'
      ? MONTHS[monthIndex - 1] || MONTHS[11]
      : '';

  const neededMonthDays = {
    current: () => currentMonth.days,
    next: () => currentMonth.days.slice(0, neededDays()),
    prev: () => currentMonth.days.slice(-3),
  }

  function handleDateSelect(dayId) {
    const prevMonth = MONTHS[monthIndex - 1] ? MONTHS[monthIndex - 1].name : MONTHS[11].name;
    const nextMonth = MONTHS[monthIndex + 1] ? MONTHS[monthIndex + 1].name : MONTHS[0].name;

    if (dayId.includes(prevMonth)) {
      if (monthIndex === 0) {
        setMonthIndex(11);
        setCurrentYear(prev => prev - 1);
        return;
      }
      
      setMonthIndex(prev => prev - 1);
    } 

    if (dayId.includes(nextMonth)) {
      if (monthIndex === 11) {
        setMonthIndex(0);
        setCurrentYear(prev => prev + 1);
        
        return
      }
      
      setMonthIndex(prev => prev + 1);
    }

    setSelectedDate(dayId);
  }

  return (
    <>
      {neededMonthDays[month]().map((day) => {
        const dayId = `${currentMonth.name}-${day}-${currentYear}`;

        return (
          <label 
            className={`
              ${styles['number']} 
              ${['prev', 'next'].includes(month) ? styles['number--other-month'] : ''}
              ${selectedDate === dayId ? styles['number--active'] : ''}
            `}
            key={dayId}
            onClick={() => {
              handleDateSelect(dayId);
              useStore === 'Date' ? setStoredSelectedDate(dayId) : setStoredEventDate(dayId);
            }}
          >
            <span>{day}</span>
          </label>
        )
      })}
    </>
  )
}