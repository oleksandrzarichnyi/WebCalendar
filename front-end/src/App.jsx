import './styles/main.scss'
import Header from './components/Header/Header.jsx'
import DatePicker from './ui-kit/DatePicker/DatePicker.jsx'
import CustomButton from './ui-kit/Buttons/CustomButton.jsx'
import Calendars from './components/Calendars/Calendars.jsx'

function App() {

  return (
    <>
      <Header />
      <div className="container">
        <div className="flex flex-col gap-[16px] py-[32px]">
          <CustomButton variant="primary" text="Create" icon="addIcon" maxWidth="240px" />
          <DatePicker initialMonthIndex={11} />
          <Calendars />
        </div>
      </div>
    </>
  )
}

export default App