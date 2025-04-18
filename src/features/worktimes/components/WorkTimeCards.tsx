import { CalendarWeek } from '../../../commons/CalenderWeek.ts';
import './WorkTimeCards.css';
import { useWorkTimesQuery } from './api/useWorkTimesQuery.ts';

/**
 * WorkTimeTable component
 * @param workTimes - array of work time entries
 */
export default function WorkTimeCards() {
  const week = CalendarWeek.getWeek();
  const year = new Date().getUTCFullYear();
  const { isPending, isError, error, data } = useWorkTimesQuery(week, year);

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div>
      {data.length === 0 ? (
        <div className="worktime-card--empty">
          <span>No work times for week: {week}</span>
        </div>
      ) : (
        data.map((workTime) => (
          <div className="worktime-card" key={workTime.id}>
            <div className="worktime-card--time">
              <div className="worktime">{workTime.date}</div>
              <div className="worktime">{workTime.hours} hours</div>
            </div>
            <div className="worktime worktime-note">{workTime.note}</div>
          </div>
        ))
      )}
    </div>
  );
}
