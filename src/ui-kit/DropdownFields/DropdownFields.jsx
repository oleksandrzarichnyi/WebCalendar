import { useState } from "react"
import styles from "./DropdownFields.module.scss"
import CustomButton from '../Buttons/CustomButton.jsx'

export default function DropdownField({ options = [], placeholder, buttonVariant, dropdown, buttonIconRight, buttonIconLeft }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const toggle = () => setOpen(!open);

  const handleSelect = (option) => {
    setSelected(option);
    setOpen(false);
  };

  let dropdownStyle = '';
  if (dropdown === 'dropdown-time') dropdownStyle = 'container--time';
  if (dropdown === 'dropdown-weekday') dropdownStyle = 'container--weekday';

  return (
    <div className={`${styles['container']} ${styles[dropdownStyle]}`}>
      {dropdown === 'dropdown-time' && <h3 className={styles['title']}>Time</h3>}
      <CustomButton 
        variant={buttonVariant}
        text={placeholder} 
        onClick={toggle} 
        selected={selected} 
        isActive={buttonVariant === 'dropdown-weekday' ? open : ''} 
        iconRight={buttonIconRight}
      />
      {open && (
        <ul className={styles['list']}>
          {options.map((option) => (
            <li
              key={option}
              onClick={() => handleSelect(option)}
              className={styles['item']}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}