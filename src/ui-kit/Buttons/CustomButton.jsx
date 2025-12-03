import styles from './Buttons.module.scss'
import icons from '../icons/icons.jsx'

export default function CustomButton({ variant, onClick, text, icon, selected, isActive, type, iconRight, ...props }) {

  return (
    <button
      {...props}
      className={`${styles[`${variant}`]} ${isActive && styles[`${variant}--active`]}`}
      onClick={onClick}
      type={type}
    >
      {icon && <img src={icons[icon]} alt="left icon" />}
      <span>{selected || text}</span>
      {iconRight && <img src={icons[iconRight]} alt="right icon" />}
    </button>
  )
}