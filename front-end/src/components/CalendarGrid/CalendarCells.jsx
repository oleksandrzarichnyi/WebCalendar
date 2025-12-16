import styles from './CalendarCells.module.scss'
import { TIME_HOURS } from './TIME_HOURS'

export default function CalendarCells() {
  return (
    <>
      {TIME_HOURS.map((hour) => 
        hour === '00:00' ? (
          <div key={hour} className={`${styles['cell']} relative`}>
            <p className="absolute left-[-53px]">{hour}</p>
          </div>
        ) : (
          <div key={hour} className={`${styles['cell']} relative`}>
            <p className="absolute top-[-10px] left-[-53px]">{hour}</p>
          </div>
        )
      )}
    </>
  )
}