import WorkTimeTable from '../components/WorkTimeTable/WorkTimeTable.tsx';
import useCalenderWeek from '../components/WorkTimeTable/hooks/useCalenderWeek.ts';
import { WorkTime } from '../components/WorkTimeTable/models/WorkTime.ts';

function WorkTimePage() {
  const { calenderWeek, setCalenderWeek } = useCalenderWeek();

  return (
    <div>
      <WorkTimeTable workTimes={} />
    </div>
  );
}

export default WorkTimePage;
