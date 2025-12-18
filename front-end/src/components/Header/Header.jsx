import '../../styles/main.scss'
import styles from './Header.module.scss'
import logo from '../../img/logo.svg'
import CustomButton from '../../ui-kit/Buttons/CustomButton.jsx'
import { useDateStore } from '../../hooks/useDateStore.jsx'

export default function Header() {
  const { date, setPrevMonth, setNextMonth, setStoredSelectedDate, storedSelectedDate, setNextDay, setPrevDay } = useDateStore();
  
  function setDateToday(timestamp = Date.now()) {
    const date = new Date(timestamp);

    const month = date.toLocaleString('en-US', { month: 'long' });
    const day = date.getDate();
    const year = date.getFullYear();

    setStoredSelectedDate(`${month}-${day}-${year}`);
  }

  const eventDate = (date) => {
    if (!date) return '';
    if (date === 'Not selected') return '';

    const [month, day, year] = date.split('-');

    const input = new Date(`${month} ${day}, ${year}`);

    if (isNaN(input)) return ''; 

    const formatted = new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(input);

    return formatted;
  };
  
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
          <p className={styles['date']}>{eventDate(storedSelectedDate)}</p>
        </div>
      </div>
    </div>
  )
}