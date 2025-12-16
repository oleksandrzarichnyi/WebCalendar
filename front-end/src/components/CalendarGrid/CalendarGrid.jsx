import styles from './CalendarGrid.module.scss'
import CalendarCells from './CalendarCells.jsx'
import { useDateStore } from '../../hooks/useDateStore.jsx'

export default function CalendarGrid() {
  return (
    <>
      <div className={styles['container']}>
        <div className={styles['header']}>
          <div className={styles['date-cell']}>
            <div className={styles['date']}>
              <p className={styles['date-number']}>2</p>
              <p className={styles['date-day']}>THU</p>
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