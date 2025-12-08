import styles from './DatePicker.module.scss'
import { useDateStore } from '../../hooks/useDateStore'

const fillDays = (number) => {
  let days = [];

  for (let i = 1; i <= number; i++) {
    days.push(i);
  }
  
  return days;
}

export const months = [
  { name: 'January', days: fillDays(31) },
  { name: 'February', days: fillDays(28) },
  { name: 'March', days: fillDays(31) },
  { name: 'April', days: fillDays(30) },
  { name: 'May', days: fillDays(31) },
  { name: 'June', days: fillDays(30) },
  { name: 'July', days: fillDays(31) },
  { name: 'August', days: fillDays(31) },
  { name: 'September', days: fillDays(30) },
  { name: 'October', days: fillDays(31) },
  { name: 'November', days: fillDays(30) },
  { name: 'December', days: fillDays(31) },
];

export function MapDays({ monthIndex, setMonthIndex, selectedDate, setSelectedDate, month, setCurrentYear, currentYear }) {
  const neededDays = () => 39 - months[monthIndex].days.length;

  const { setStoredSelectedDate } = useDateStore();

  const currentMonth = 
    month === 'current' 
      ? months[monthIndex]
      :
    month === 'next'
      ? months[monthIndex + 1] || months[0]
      :
    month === 'prev'
      ? months[monthIndex - 1] || months[11]
      : '';

  const neededMonthDays = {
    current: () => currentMonth.days,
    next: () => currentMonth.days.slice(0, neededDays()),
    prev: () => currentMonth.days.slice(-3),
  }

  function handleDateSelect(dayId) {
    const prevMonth = months[monthIndex - 1] ? months[monthIndex - 1].name : months[11].name;
    const nextMonth = months[monthIndex + 1] ? months[monthIndex + 1].name : months[0].name;

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
              setStoredSelectedDate(dayId);
            }}
          >
            <span>{day}</span>
          </label>
        )
      })}
    </>
  )
}