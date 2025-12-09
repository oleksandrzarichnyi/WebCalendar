import styles from './CreateCalendar.module.scss'
import CustomButton from '../../ui-kit/Buttons/CustomButton'
import { Formik, Form } from 'formik'
import InputField from '../../ui-kit/InputField/InputField'
import icons from '../../ui-kit/icons/icons'
import ColorPicker from '../../ui-kit/ColorPicker/ColorPicker.jsx'

export default function CreateCalendar() {
  return (
    <>
      <div className={styles['container']}>
        <div className="flex justify-between items-center">
          <h2 className={styles['title']}>Create calendar</h2>
          <CustomButton icon="closeIcon" />
        </div>
        <div className="w=[262px] h-[1px] bg-[#DEDFE5] my-[16px]"></div>
        <div className="flex items-center gap-[16px] mb-[24px]">
          <img src={icons['titleIcon']} alt="asd" />
          <Formik
            initialValues={{title: ''}}
          >
            {({ errors, touched }) => (
              <InputField 
                type="text" 
                title="Title" 
                name="title" 
                placeholder="Enter title" 
                errors={errors} 
                touched={touched} 
                height="40px" 
                width="230px" 
              />
            )}
          </Formik>
        </div>
        <div className="flex flex-col mb-[24px]">
          <h2 className={`${styles['item-title']} ml-[32px]`}>Color</h2>
          <div className="flex gap-[16px] items-start">
            <img src={icons['colorPickerIcon']} alt="" />
            <ColorPicker />
          </div>
        </div>
        <div className="flex w-full justify-end pr-[12px]">
          <CustomButton variant="primary" text="Save" width="80px" />
        </div>
      </div>
    </>
  )
}