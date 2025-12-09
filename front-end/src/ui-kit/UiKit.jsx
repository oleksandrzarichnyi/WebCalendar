import '../styles/main.scss'
import CustomButton from './Buttons/CustomButton.jsx'
import Link from './Links/Links'
import Modal from './Modal/Modal'
import Description from './Description/Desctiption'
import Toast from './Toast/Toast'
import Checkbox from './Checkbox/Checkbox'
import DropdownField from './DropdownFields/DropdownFields'
import TestForm from './Forms/Forms'
import ColorPicker from './ColorPicker/ColorPicker'
import DatePicker from './DatePicker/DatePicker'

const modalText = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa veritatis possimus cumque molestias unde. Obcaecati maiores, quo unde perferendis voluptas quod optio explicabo quisquam, magni perspiciatis officiis dignissimos delectus blanditiis?";
const timeOptions = [];
const weekDayOptions = ['Week', 'Day']

for (let h = 0; h < 24; h++) {
  for (let m = 0; m < 60; m += 15) {
    const hour = String(h).padStart(2, "0");
    const min = String(m).padStart(2, "0");
    timeOptions.push(`${hour}:${min}`);
  }
}

export default function uiKit() {

  return (
    <>
      <div className="min-h-screen min-w-screen flex p-[20px] flex-col gap-[30px]">
        <div className="flex gap-[20px] items-center">
          <CustomButton text={'primary'} variant={'primary'} icon={'playIcon'} />
          <CustomButton text={'secondary'} variant={'secondary'} />
          <p>Buttons</p>
        </div>
        <div className="flex gap-[20px] items-center">
          <Link variant={'default-link'} text={'Link'} link={'#!'} />
          <p>Links</p>
        </div>
        <div className="flex gap-[20px] items-center">
          <Modal maxWidth={'488px'} title={'Title'} text={modalText} isOpen={true} />
          <p>Modal</p>
        </div>
        <div className="flex gap-[20px] items-center">
          <Description title={'Description'} text={modalText} maxWidth={'456px'}/>
          <p>Text area</p>
        </div>
        <div className="flex gap-[20px] items-center">
          <Toast isOpen={true} />
          <p>Toast</p>
        </div>
        <div className="flex gap-[20px] items-center">
          <Checkbox text={'Text'} isChecked={true} />
          <Checkbox textLeft={'Text'} />
          <p>Checkbox</p>
        </div>
        <div className="flex gap-[20px] items-center">
          <DropdownField
            options={timeOptions}
            placeholder='12:30'
            dropdown={'dropdown-time'}
            buttonVariant={'dropdown-time'}
          />
          <DropdownField
            options={weekDayOptions}
            placeholder='Week'
            dropdown={'dropdown-weekday'}
            buttonVariant={'dropdown-weekday'}
            buttonIconRight="downIcon"
          />
          <p>Dropdown fields</p>
        </div>
        <div className="flex gap-[20px] items-center">
          <TestForm />
          <p>Input fields / form</p>
        </div>
        <div className="flex gap-[20px] items-center">
          <ColorPicker />
          <p>Color picker</p>
        </div>
        <div className="flex gap-[20px] items-center">
          <DatePicker initialMonthIndex={10} />
        </div>
      </div>
    </>
  )
}