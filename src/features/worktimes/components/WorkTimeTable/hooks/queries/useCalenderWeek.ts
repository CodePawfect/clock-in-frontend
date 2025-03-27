import { getISOWeek } from 'date-fns';
import { useState } from 'react';

function useCalenderWeek() {
  const [calenderWeek, setCalenderWeek] = useState<number>(
    getISOWeek(new Date())
  );

  return { calenderWeek, setCalenderWeek };
}

export default useCalenderWeek;
