import { useState } from "react"
import styles from "./DropdownFields.module.scss"
import CustomButton from '../Buttons/CustomButton.jsx'

export default function DropdownField({ options = [], placeholder, buttonVariant, dropdown, buttonIconRight, buttonIconLeft, buttonGap, title, width, buttonPaddingRight, buttonPaddingLeft }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const toggle = () => setOpen(!open);

  const handleSelect = (option) => {
    setSelected(option);
    setOpen(false);
  };

  let dropdownStyle = '';
  if (dropdown === 'underline') dropdownStyle = 'container--underline';
  if (dropdown === 'simple') dropdownStyle = 'container--simple';

  return (
    <div 
      className={`${styles['container']} ${styles[dropdownStyle]}`}
      style={{ width: width }}
    >
      {title ? <h3 className={styles['title']}>{title}</h3> : <h3 className={styles['no-title']}>no-title</h3>}
      <CustomButton 
        variant={buttonVariant}
        text={placeholder} 
        onClick={toggle} 
        selected={selected} 
        gap={buttonGap}
        iconRight={buttonIconRight}
        paddingLeft={buttonPaddingLeft}
        paddingRight={buttonPaddingRight}
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