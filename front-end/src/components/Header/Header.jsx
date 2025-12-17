import '../../styles/main.scss'
import styles from './Header.module.scss'
import logo from '../../img/logo.svg'
import CustomButton from '../../ui-kit/Buttons/CustomButton.jsx'
import { useDateStore } from '../../hooks/useDateStore.jsx'

export default function Header() {
  const { date, setPrevMonth, setNextMonth, setStoredSelectedDate, storedSelectedDate } = useDateStore();
  
  function setDateToday(timestamp = Date.now()) {
    const date = new Date(timestamp);

    const month = date.toLocaleString('en-US', { month: 'long' });
    const day = date.getDate();
    const year = date.getFullYear();

    setStoredSelectedDate(`${month}-${day}-${year}`);
  }
  
  return (
    <div className={styles['header']}>
      <div className="container flex justify-between">
        <div className="flex items-center gap-[16px]">
          <img src={logo} className={styles['logo']} alt="" />
          <CustomButton variant="primary" text="Today" onClick={() => setDateToday()} />
          <div className="flex gap-[8px]">
            <CustomButton variant="secondary" maxWidth={'36px'} icon="arrowLeftIcon" onClick={() => setPrevMonth()} />
            <CustomButton variant="secondary" maxWidth={'36px'} icon="arrowRightIcon" onClick={() => setNextMonth()} />
          </div>
          <p className={styles['date']}>{date.month} {date.year}</p>
        </div>
      </div>
    </div>
  )
}