import styles from './CreateEvent.module.scss'
import CustomButton from '../../ui-kit/Buttons/CustomButton'
import { Formik, Form, useFormikContext } from 'formik'
import InputField from '../../ui-kit/InputField/InputField'
import icons from '../../ui-kit/icons/icons'
import { useRef } from 'react'
import DropdownField from '../../ui-kit/DropdownFields/DropdownField'
import Description from '../../ui-kit/Description/Desctiption'

export default function CreateEvent({ isOpen, onClose }) {
  const titleRef = useRef('');

  return (
    <>
      {isOpen ? 
        <div className={styles['container']}>
          <div className="flex justify-between">
            <h2 className={styles['title']}>Create Event</h2>
            <CustomButton icon="closeIcon" onClick={onClose} />
          </div>
          <div className="w-full h-[1px] bg-[#DEDFE5] my-[16px]"></div>
          <div className="flex flex-col gap-[24px]">
            <div className="flex gap-[16px]">
              <img src={icons['titleIcon']} alt="" />
              <Formik
                innerRef={titleRef}
                initialValues={{ title: '' }}
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
                    width="456px"
                  />
                )}
              </Formik>
            </div>
            <div className="flex gap-[16px]">
              <div className="flex gap-[16px] items-center">
                <img src={icons['clockIcon']} alt="" className="w-[16px] h-[16px]" />
                <Formik
                  initialValues={{ date: '' }}
                >
                  {({errors, touched}) => (
                    <InputField 
                      type="text" 
                      title="Date" 
                      name="date" 
                      placeholder="Choose a date" 
                      errors={errors} 
                      touched={touched} 
                      height="40px" 
                      width="240px"
                    />
                  )}
                </Formik>
              </div>
              <div className="flex gap-[8px]">
                <DropdownField
                  options={['12:30', '01:30']}
                  dropdown="underline"
                  title="Time"
                  width="88px"
                  buttonVariant="transparent"
                />
                <div className="w-[8px] h-[1px] bg-[#5B5F6E] mt-[24px]"></div>
                <DropdownField
                  options={['12:30', '01:30']}
                  dropdown="underline"
                  width="88px"
                  buttonVariant="transparent"
                />
              </div>
            </div>
            <div className="flex w-[488px] h-[40px] flex justify-between">
              <img src={icons['calendarIcon']} alt="" className="w-[16px] h-[16px] mt-[14px]" />
              <DropdownField
                options={['1', '2']}
                dropdown="underline"
                width="456px"
                placeholder="test"
                title="Calendar"
                buttonVariant="transparent"
                buttonIconRight="arrowDownIconBlack"
                buttonPaddingLeft="24px"
                buttonPaddingRight="8px"
              />
            </div>
            <div className="flex gap-[16px] items-start">
              <img src={icons['descriptionIcon']} alt="" className="mt-[14px]" />
              <Description title="Description" text="test" width="456px" />
            </div>
            <div className="flex justify-end">
              <CustomButton variant="primary" text="Save" width="80px" />
            </div>
          </div>
        </div>
      : ''}
    </>
  )
}