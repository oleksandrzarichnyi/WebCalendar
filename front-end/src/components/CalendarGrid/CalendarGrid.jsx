import styles from './CalendarGrid.module.scss'
import CalendarCells from './CalendarCells.jsx'
import { useDateStore } from '../../hooks/useDateStore.jsx'
import { parseSelectedDay } from '../../utils/dateFormatters.jsx';

export default function CalendarGrid() {
  const { storedSelectedDate } = useDateStore();

  const selectedDate = parseSelectedDay(storedSelectedDate);

  return (
    <>
      <div className={styles['container']}>
        <div className={styles['header']}>
          <div className={styles['date-cell']}>
            <div className={styles['date']}>
              <p className={styles['date-number']}>{selectedDate?.number}</p>
              <p className={styles['date-day']}>{selectedDate?.day}</p>
            </div>
          </div>
        </div>
        <div className={styles['divider']}></div>
        <div className={styles['container--grid']}>
          <CalendarCells />
        </div>
      </div>
    </>
  )
}