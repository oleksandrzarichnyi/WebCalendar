import '../../styles/main.scss'
import styles from './Header.module.scss'
import logo from '../../img/logo.svg'
import CustomButton from '../../ui-kit/Buttons/CustomButton.jsx'
import DropdownField from '../../ui-kit/DropdownFields/DropdownField.jsx'

export default function Header() {
  return (
    <div className={styles['header']}>
      <div className="container flex justify-between">
        <div className="flex items-center gap-[16px]">
          <img src={logo} className={styles['logo']} alt="" />
          <CustomButton variant="primary" text="Today" />
          <div className="flex gap-[8px]">
            <CustomButton variant="secondary" maxWidth={'36px'} icon="arrowLeftIcon" />
            <CustomButton variant="secondary" maxWidth={'36px'} icon="arrowRightIcon" />
          </div>
          <p className={styles['date']}>December 2025</p>
        </div>
        <div className="flex gap-[32px]">
          <DropdownField dropdown="dropdown-weekday" buttonVariant="secondary" options={['Day', 'Week']} buttonIconRight="downIcon" buttonGap="4px" />
        </div>
      </div>
    </div>
  )
}