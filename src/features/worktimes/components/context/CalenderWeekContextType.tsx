import { createContext, useState, useContext, ReactNode } from 'react';
import { CalendarWeek } from '../../../../commons/CalenderWeek.ts';

export interface CalenderWeekContextType {
  getCalenderWeek: () => number;
  getCalenderYear: () => number;
  setNextWeekAndYear: () => void;
  setPrevWeekAndYear: () => void;
  setCurrentWeekAndYear: () => void;
}

const CalenderWeekContext = createContext<CalenderWeekContextType | undefined>(
  undefined
);

/**
 * CalenderWeekProvider is a context provider that provides the current calender-week and year
 */
export function CalenderWeekProvider({ children }: { children: ReactNode }) {
  const [week, setWeek] = useState<number>(CalendarWeek.getWeek());
  const [year, setYear] = useState<number>(new Date().getFullYear());

  function getCalenderWeek() {
    return week;
  }

  function getCalenderYear() {
    return year;
  }

  function setCurrentWeekAndYear() {
    setWeek(CalendarWeek.getWeek());
    setYear(new Date().getFullYear());
  }

  function setNextWeekAndYear() {
    setYear((prevYear) => (week >= 52 ? prevYear + 1 : prevYear));
    setWeek((prevWeek) => (week >= 52 ? 1 : prevWeek + 1));
  }

  function setPrevWeekAndYear() {
    setYear((prevYear) => (week <= 1 ? prevYear - 1 : prevYear));
    setWeek((prevWeek) => (week <= 1 ? 52 : prevWeek - 1));
  }

  return (
    <CalenderWeekContext.Provider
      value={{
        getCalenderWeek,
        getCalenderYear,
        setCurrentWeekAndYear,
        setNextWeekAndYear,
        setPrevWeekAndYear,
      }}
    >
      {children}
    </CalenderWeekContext.Provider>
  );
}

export function useCalenderWeekContext() {
  const context = useContext(CalenderWeekContext);
  if (context === undefined) {
    throw new Error(
      'useCalenderWeekContext must be used within a CalenderWeekProvider'
    );
  }
  return context;
}
