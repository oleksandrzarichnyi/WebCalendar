import styles from './CalendarGrid.module.scss'
import CalendarCells from './CalendarCells.jsx'
import { useDateStore } from '../../hooks/useDateStore.jsx'

export default function CalendarGrid() {
  const { storedSelectedDate } = useDateStore();

  function parseDate(dateStr) {
    if (!dateStr) return;

    const [month, day, year] = dateStr.split('-');
    const date = new Date(`${month} ${day}, ${year}`);

    if (isNaN(date)) return;

    const weekday = new Intl.DateTimeFormat('en-US', { weekday: 'short' })
      .format(date)
      .toUpperCase();

    return {
      day: weekday,
      number: date.getDate()
    };
  }

  const selectedDate = parseDate(storedSelectedDate);

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