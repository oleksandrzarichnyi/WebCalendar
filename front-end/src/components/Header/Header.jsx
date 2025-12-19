import '../../styles/main.scss'
import styles from './Header.module.scss'
import logo from '../../img/logo.svg'
import CustomButton from '../../ui-kit/Buttons/CustomButton.jsx'
import { useDateStore } from '../../hooks/useDateStore.jsx'
import { parseHeaderDate } from '../../utils/dateFormatters.jsx'

export default function Header() {
  const { date, setPrevMonth, setNextMonth, setStoredSelectedDate, storedSelectedDate, setNextDay, setPrevDay } = useDateStore();
  
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
            <CustomButton variant="secondary" maxWidth={'36px'} icon="arrowLeftIcon" onClick={() => setPrevDay()} />
            <CustomButton variant="secondary" maxWidth={'36px'} icon="arrowRightIcon" onClick={() => setNextDay()} />
          </div>
          <p className={styles['date']}>{parseHeaderDate(storedSelectedDate)}</p>
        </div>
      </div>
    </div>
  )
}