import './styles/main.scss'
import Header from './components/Header/Header.jsx'
import DatePicker from './ui-kit/DatePicker/DatePicker.jsx'

function App() {

  return (
    <>
      <Header />
      <DatePicker initialMonthIndex={11} />
    </>
  )
}

export default App