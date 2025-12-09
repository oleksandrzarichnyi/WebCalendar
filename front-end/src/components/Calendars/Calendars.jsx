import styles from './Calendars.module.scss'
import CustomButton from '../../ui-kit/Buttons/CustomButton.jsx'
import Checkbox from '../../ui-kit/Checkbox/Checkbox.jsx'

export default function Calendars() {
  return (
    <>
      <div className={styles['container']}>
        <div className="flex justify-between">
          <h2 className={styles['title']}>My Calendars</h2>
          <CustomButton icon="addIconBlack" />
        </div>
        <div className="flex flex-col gap-[22px]">
          <Checkbox text="Calendar 1" color="red" />
          <Checkbox text="Calendar 1" color="green" />
          <Checkbox text="Calendar 1" color="blue" />
          <Checkbox text="Calendar 1" color="orange" />
        </div>
      </div>
    </>
  )
}