import './styles/main.scss'
import Header from './components/Header/Header.jsx'
import DatePicker from './ui-kit/DatePicker/DatePicker.jsx'
import CustomButton from './ui-kit/Buttons/CustomButton.jsx'
import Calendars from './components/Calendars/Calendars.jsx'
import CreateEvent from './components/CreateEvent/CreateEvent.jsx'
import { useState } from 'react'
import { useEventStore } from './hooks/useEventStore.jsx'
import CalendarGrid from './components/CalendarGrid/CalendarGrid.jsx'

function App() {
  const [isCreateEvent, setIsCreateEvent] = useState(false);

  const { setStoredEventDate } = useEventStore();

  function handleCreate() {
    setIsCreateEvent(prev => !prev);
    setStoredEventDate('');
  }

  return (
    <>
      <Header />
      <div className="container flex gap-[30px] py-[32px]">
        <div className="flex flex-col gap-[16px] relative">
          <CustomButton variant="primary" text="Create" icon="addIcon" maxWidth="240px" onClick={handleCreate} />
          <div className="absolute flex">
            <CreateEvent isOpen={isCreateEvent} onClose={handleCreate} />
          </div>
          <DatePicker initialMonthIndex={11} />
          <Calendars />
        </div>
        <CalendarGrid />
      </div>
    </>
  )
}

export default App