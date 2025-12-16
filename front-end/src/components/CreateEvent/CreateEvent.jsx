import styles from './CreateEvent.module.scss'
import CustomButton from '../../ui-kit/Buttons/CustomButton'
import { Formik, Form, useFormikContext } from 'formik'
import InputField from '../../ui-kit/InputField/InputField'
import icons from '../../ui-kit/icons/icons'
import { useRef, useState, useMemo, useEffect } from 'react'
import DropdownField from '../../ui-kit/DropdownFields/DropdownField'
import Description from '../../ui-kit/Description/Desctiption'
import DatePicker from '../../ui-kit/DatePicker/DatePicker'
import { useEventStore } from '../../hooks/useEventStore.jsx'
import { useQuery, useMutation } from '@tanstack/react-query'
import { updateCalendar } from '../../api/calendarsApi.jsx'
import { getCalendars } from '../../api/calendarsApi.jsx'
import { TIME_INTERVALS } from './TIME_INTERVALS.jsx'

export default function CreateEvent({ isOpen, onClose }) {
  const [isDatePicker, setIsDatePicker] = useState(false);

  const { data: calendars } = useQuery({
    queryKey: ['calendars'],
    queryFn: getCalendars
  });

  const addEventMutation = useMutation({
    mutationFn: updateCalendar
  });

  const [selectedCalendarId, setSelectedCalendarId] = useState(null);
  const titleRef = useRef('');
  const descRef = useRef('');
  const [startTime, setStartTime] = useState(TIME_INTERVALS[48]);
  const [endTime, setEndTime] = useState(TIME_INTERVALS[49]);
  const [selectedTime, setSelectedTime] = useState([startTime, endTime]);
  
  const endTimeIntervals = TIME_INTERVALS.slice(TIME_INTERVALS.indexOf(startTime) + 1);

  useEffect(() => {
    setSelectedTime([startTime, endTime]);
  }, [startTime, endTime]);

  useEffect(() => {
    if (!endTimeIntervals.includes(endTime)) {
      setEndTime(endTimeIntervals[0]);
    }
  }, [startTime]);

  useEffect(() => {
    if (calendars && calendars.length > 0) {
      setSelectedCalendarId(calendars[0].id);
    }
  }, [calendars]);

  const toggleDatePicker = () => setIsDatePicker(prev => !prev);

  const { storedEventDate } = useEventStore();
  const eventDate = (date) => {
    if (!date) return '';

    const input = new Date(date.replace(/-/g, ' '));

    const formatted = new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    }).format(input);

    return formatted;
  }

  function handleOnClose() {
    onClose();
    setStartTime(TIME_INTERVALS[48]);
    setEndTime(TIME_INTERVALS[49]);
  }

  function handleNewEvent() {
    addEventMutation.mutate({
      id: selectedCalendarId,
      data: {
        event: {
          title: titleRef.current?.values?.title || 'Untitled',
          date: storedEventDate || 'Not selected',
          desc: descRef.current.value || 'No description',
          time: selectedTime,
          id: Date.now(),
        }
      }
    });
    onClose();
    setStartTime(TIME_INTERVALS[48]);
    setEndTime(TIME_INTERVALS[49]);
  }

  const selectedCalendarTitle = () => {
    const selectedCalendar = calendars.find(c => c.id === selectedCalendarId);
    return selectedCalendar.title;
  }

  return (
    <>
      {isOpen ? 
        <div className={styles['container']}>
          <div className="flex justify-between">
            <h2 className={styles['title']}>Create Event</h2>
            <CustomButton icon="closeIcon" onClick={handleOnClose} />
          </div>
          <div className="w-full h-[1px] bg-[#DEDFE5] my-[16px]"></div>
          <div className="flex flex-col gap-[24px]">
            <div className="flex gap-[16px]">
              <img src={icons['titleIcon']} alt="" />
              <Formik
                initialValues={{ title: '' }}
                innerRef={titleRef}
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
                    <DatePicker initialMonthIndex={11} useStore="Event" />
                  </div>
                : ''}
                <label onClick={toggleDatePicker}>
                  <Formik
                    initialValues={{ date: eventDate(storedEventDate) || '' }}
                  >
                    {({errors, touched, setFieldValue}) => {
                      useEffect(() => {
                        setFieldValue('date', eventDate(storedEventDate))
                      }, [storedEventDate]);

                      return (
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
                      )
                    }}
                  </Formik>
                </label>
              </div>
              <div className="flex gap-[8px]">
                <DropdownField
                  options={TIME_INTERVALS}
                  placeholder={TIME_INTERVALS[48]}
                  onChange={setStartTime}
                  dropdown="underline"
                  title="Time"
                  width="88px"
                  buttonVariant="transparent"
                />
                <div className="w-[8px] h-[1px] bg-[#5B5F6E] mt-[24px]"></div>
                <DropdownField
                  options={endTimeIntervals}
                  placeholder={endTime}
                  onChange={setEndTime}
                  dropdown="underline"
                  width="88px"
                  buttonVariant="transparent"
                />
              </div>
            </div>
            <div className="flex w-[488px] h-[40px] flex justify-between">
              <img src={icons['calendarIcon']} alt="" className="w-[16px] h-[16px] mt-[14px]" />
              <DropdownField
                options={calendars}
                dropdown="underline"
                width="456px"
                placeholder={selectedCalendarTitle()}
                title="Calendar"
                buttonVariant="transparent"
                buttonIconRight="arrowDownIconBlack"
                buttonPaddingRight="8px"
                onChange={setSelectedCalendarId}
              />
            </div>
            <div className="flex gap-[16px] items-start">
              <img src={icons['descriptionIcon']} alt="" className="mt-[14px]" />
              <Description title="Description" text="test" width="456px" ref={descRef} />
            </div>
            <div className="flex justify-end">
              <CustomButton onClick={() => {
                console.log('date: ', storedEventDate);
                console.log('title: ', titleRef.current?.values?.title);
                console.log('id: ', selectedCalendarId);
                console.log('desc: ', descRef.current.value);
                console.log('time: ', selectedTime);
                handleNewEvent();
              }} variant="primary" text="Save" width="80px" />
            </div>
          </div>
        </div>
      : ''}
    </>
  )
}