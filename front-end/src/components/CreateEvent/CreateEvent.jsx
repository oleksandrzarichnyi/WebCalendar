import styles from './CreateEvent.module.scss'
import CustomButton from '../../ui-kit/Buttons/CustomButton'
import { Formik, Form, useFormikContext } from 'formik'
import InputField from '../../ui-kit/InputField/InputField'
import icons from '../../ui-kit/icons/icons'
import { useRef, useState, useMemo } from 'react'
import DropdownField from '../../ui-kit/DropdownFields/DropdownField'
import Description from '../../ui-kit/Description/Desctiption'
import DatePicker from '../../ui-kit/DatePicker/DatePicker'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getCalendars, addCalendar, deleteCalendar } from '../../api/calendarsApi.jsx'

export default function CreateEvent({ isOpen, onClose }) {
  const [isDatePicker, setIsDatePicker] = useState(false);
  const titleRef = useRef('');

  const queryClient = useQueryClient();
  const { data: calendars, isLoading } = useQuery({
    queryKey: ['calendars'],
    queryFn: getCalendars
  });

  const eventOptions = useMemo(() => {
    if (!calendars) return [];
    return calendars.map(calendar => calendar.title);
  }, [calendars]);

  console.log(eventOptions)

  const toggleDatePicker = () => setIsDatePicker(prev => !prev);

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
              <div className="flex gap-[16px] items-center relative">
                <img src={icons['clockIcon']} alt="" className="w-[16px] h-[16px]" />
                {isDatePicker ? 
                  <div className="absolute z-30 top-[44px] left-[30px]">
                    <DatePicker />
                  </div>
                : ''}
                <label onClick={toggleDatePicker}>
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
                        readOnly={true}
                      />
                    )}
                  </Formik>
                </label>
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
                options={eventOptions}
                dropdown="underline"
                width="456px"
                placeholder={eventOptions[0]}
                title="Calendar"
                buttonVariant="transparent"
                buttonIconRight="arrowDownIconBlack"
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