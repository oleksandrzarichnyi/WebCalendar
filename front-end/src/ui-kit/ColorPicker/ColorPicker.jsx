import styles from './ColorPicker.module.scss'
import ColorIcon from '../icons/color-icon.svg?react'
import '../../styles/main.scss'
import { useState } from 'react'
import icons from '../icons/icons'

const colors = ['#16AF6E', '#397E49', '#4254AF', '#429488', '#439BDF', '#6C7AC4', '#8332A4', '#9F2957', '#B8C42F', '#D90056', '#DFC45A', '#E25D33', ]

export default function ColorPicker({ selectedColor, setSelectedColor }) {
  return (
    <>
      <form 
        className={styles['form']}
        onChange={(event) => setSelectedColor(event.target.value)}
        data-testid="color-picker"
      >
        {colors.map((color) => (
          <label
            key={color}
            className="relative"
          >
            {selectedColor === color && <img src={icons.selectedColorIcon} className="absolute"  />}
            <ColorIcon 
              className={styles['color-to-display']} 
              style={{ color: color }} 
              draggable='false'
            />
            <input 
              className={styles['radio-to-hide']} 
              type="radio" 
              name="color" 
              value={color} 
            />
          </label>
        ))}
      </form>
    </>
  )
}