import styles from './CreateCalendar.module.scss'
import CustomButton from '../../ui-kit/Buttons/CustomButton'
import { Formik, Form, useFormikContext } from 'formik'
import InputField from '../../ui-kit/InputField/InputField'
import icons from '../../ui-kit/icons/icons'
import ColorPicker from '../../ui-kit/ColorPicker/ColorPicker.jsx'
import { useRef, useState, useEffect } from 'react'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getCalendars, addCalendar, updateCalendar } from '../../api/calendarsApi.jsx'

export default function CreateCalendar({ isShown, onClose, title, calendar }) {
  const formikRef = useRef(null);
  const [selectedColor, setSelectedColor] = useState('');

  useEffect(() => {
    setSelectedColor(calendar?.color || '');
  }, [calendar])

  const queryClient = useQueryClient();

  const addNewCalendar = useMutation({
    mutationFn: addCalendar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['calendars'] });
    }
  });

  const editCalendar = useMutation({
    mutationFn: updateCalendar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['calendars'] });
    }
  });

  function handleEdit() {
    editCalendar.mutate({
      id: calendar.id,
      data: {
        title: formikRef.current.values.title,
        color: selectedColor,
      }
    });
    setSelectedColor('');
    onClose();
  }

  function handleSave() {
    addNewCalendar.mutate({ title: formikRef.current.values.title, color: selectedColor });
    setSelectedColor('');
    onClose();
  }

  return (
    <>
      {isShown ? 
        <div className={`${styles['container']} absolute z-10`}>
          <div className="flex justify-between items-center">
            <h2 className={styles['title']}>{title} calendar</h2>
            <CustomButton icon="closeIcon" onClick={onClose} />
          </div>
          <div className="w=[262px] h-[1px] bg-[#DEDFE5] my-[16px]"></div>
          <div className="flex items-center gap-[16px] mb-[24px]">
            <img src={icons['titleIcon']} alt="asd" />
            <Formik
              innerRef={formikRef}
              initialValues={{title: calendar?.title || ''}}
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
              <ColorPicker selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
            </div>
          </div>
          <div className="flex w-full justify-end pr-[12px]">
            <CustomButton variant="primary" text="Save" width="80px" onClick={title === 'Edit' ? handleEdit : handleSave} />
          </div>
        </div>
      : ''}
    </>
  )
}