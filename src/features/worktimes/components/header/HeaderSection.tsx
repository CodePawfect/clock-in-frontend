import './HeaderSection.css';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { useCalenderWeekContext } from '../context/CalenderWeekContextType.tsx';

export default function HeaderSection() {
  const {
    getCalenderWeek,
    getCalenderYear,
    setPrevWeekAndYear,
    setNextWeekAndYear,
  } = useCalenderWeekContext();

  return (
    <div className="find-good-class-name">
      <div className="header-section">
        <h1>{getCalenderYear()}</h1>
        <div className="header-container">
          <ChevronLeftIcon onClick={() => setPrevWeekAndYear()} />
          <h1>KW: {getCalenderWeek()}</h1>
          <ChevronRightIcon onClick={() => setNextWeekAndYear()} />
        </div>
      </div>
      <button className="add-button">Add</button>
    </div>
  );
}
