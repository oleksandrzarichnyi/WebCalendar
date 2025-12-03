import styles from './DatePicker.module.scss'
import CustomButton from '../Buttons/CustomButton.jsx'
import { useState } from 'react'
import { months, MapDays } from './datePickerFunctions'

export default function DatePicker({ initialMonthIndex = 10 }) {
  const [monthIndex, setMonthIndex] = useState(initialMonthIndex);
  const [currentYear, setCurrentYear] = useState(2025);
  const [selectedDate, setSelectedDate] = useState('');

  const currentMonth = months[monthIndex].name;

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
            <p className={styles['day']}>S</p>
            <p className={styles['day']}>M</p>
            <p className={styles['day']}>T</p>
            <p className={styles['day']}>W</p>
            <p className={styles['day']}>T</p>
            <p className={styles['day']}>F</p>
            <p className={styles['day']}>S</p>
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
            />
            <MapDays 
              monthIndex={monthIndex}
              setMonthIndex={setMonthIndex}
              selectedDate={selectedDate} 
              setSelectedDate={setSelectedDate}
              currentYear={currentYear}
              setCurrentYear ={setCurrentYear}
              month={'current'} 
            />
            <MapDays 
              monthIndex={monthIndex}
              setMonthIndex={setMonthIndex}
              selectedDate={selectedDate} 
              setSelectedDate={setSelectedDate}
              currentYear={currentYear}
              setCurrentYear ={setCurrentYear}
              month={'next'} 
            />
          </form>
        </div>
      </div>
    </>
  )
}