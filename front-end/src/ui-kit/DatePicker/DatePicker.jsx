import styles from './DatePicker.module.scss'
import CustomButton from '../Buttons/CustomButton.jsx'
import { useEffect, useState } from 'react'
import { MapDays } from './MapDays.jsx'
import { useDateStore } from '../../hooks/useDateStore.jsx'
import { useEventStore } from '../../hooks/useEventStore.jsx'
import { MONTHS } from './MONTHS.jsx'

const WEEK_DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function DatePicker({ initialMonthIndex = 10, useStore  = 'Date'}) {
  const [monthIndex, setMonthIndex] = useState(initialMonthIndex);
  const [currentYear, setCurrentYear] = useState(2025);
  const [selectedDate, setSelectedDate] = useState('');

  const currentMonth = MONTHS[monthIndex].name;

  const { storedMonthIndex, setStoredMonthIndex, setYear, setMonth, date } = useStore === 'Date' ?  useDateStore() : useEventStore();

  useEffect(() => {
    if (storedMonthIndex !== monthIndex) {
      setStoredMonthIndex(monthIndex);
    }
    setYear(currentYear);
    setMonth(currentMonth);
  }, [monthIndex]);

  useEffect(() => {
    if (storedMonthIndex !== null) {
      setMonthIndex(storedMonthIndex);
    }
  }, []);

  useEffect(() => {
    setCurrentYear(date.year)
  }, [date.year]);

  function handleNextMonth() {
    if (monthIndex === 11) {
      setCurrentYear(prev => prev + 1);
      setMonthIndex(0);
      return;
    }

    setMonthIndex(prev => prev + 1)
  }

  function handlePrevMonth() {
    if (monthIndex === 0) {
      setCurrentYear(prev => prev - 1);
      setMonthIndex(11);
      return;
    }

    setMonthIndex(prev => prev - 1);
  }

  function getFirstDayOfMonth(year, monthIndex) {
    return new Date(year, monthIndex, 1).getDay();
  }
  const firstDay = getFirstDayOfMonth(currentYear, monthIndex);

  const shift = (3 - firstDay + 7) % 7;
  const syncedDays = [
    ...WEEK_DAYS.slice(-shift),
    ...WEEK_DAYS.slice(0, -shift)
  ];

  return (
    <>
      <div className={styles['container']}>
        <div className="max-w-full flex justify-between items-center">
          <h2 className={styles['title']}>{currentMonth} {currentYear}</h2>
          <div className="flex gap-[8px]">
            <CustomButton data-testid="leftButton" icon={'arrowLeftIcon'} onClick={() => handlePrevMonth()} />
            <CustomButton data-testid="rightButton" icon={'arrowRightIcon'} onClick={() => handleNextMonth()} />
          </div>
        </div>
        <div className="flex max-w-full flex-col gap-[10px]">
          <div className={`flex max-w-full ${styles['days']}`}>
            {syncedDays.map((day) => (
              <p key={day} className={styles['day']}>{day[0]}</p>
            ))}
          </div>
          <form className={styles['numbers']}>
            <MapDays 
              monthIndex={monthIndex}
              setMonthIndex={setMonthIndex}
              selectedDate={selectedDate} 
              setSelectedDate={setSelectedDate}
              currentYear={currentYear}
              setCurrentYear ={setCurrentYear}
              month={'prev'} 
              useStore={useStore}
            />
            <MapDays 
              monthIndex={monthIndex}
              setMonthIndex={setMonthIndex}
              selectedDate={selectedDate} 
              setSelectedDate={setSelectedDate}
              currentYear={currentYear}
              setCurrentYear ={setCurrentYear}
              month={'current'}
              useStore={useStore}
            />
            <MapDays 
              monthIndex={monthIndex}
              setMonthIndex={setMonthIndex}
              selectedDate={selectedDate} 
              setSelectedDate={setSelectedDate}
              currentYear={currentYear}
              setCurrentYear ={setCurrentYear}
              month={'next'}
              useStore={useStore}
            />
          </form>
        </div>
      </div>
    </>
  )
}