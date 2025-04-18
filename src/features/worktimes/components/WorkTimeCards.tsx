import { useQuery } from '@tanstack/react-query';
import { WorkTime } from './types/WorkTime.ts';
import { CalendarWeek } from '../../../commons/CalenderWeek.ts';
import './WorkTimeCards.css';

/**
 * WorkTimeTable component
 * @param workTimes - array of work time entries
 */
export default function WorkTimeCards() {
  const week = CalendarWeek.getWeek();
  const year = new Date().getUTCFullYear();

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['worktimes', week, year],
    queryFn: () => fetchWorkTimes(week, year),
  });

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

async function fetchWorkTimes(week: number, year: number): Promise<WorkTime[]> {
  const res = await fetch(
    `http://localhost:8080/api/worktimes/${week}/${year}`,
    { credentials: 'include' }
  );

  if (!res.ok) throw new Error('Network response was not ok');

  const { workTimes } = (await res.json()) as { workTimes: WorkTime[] };

  return workTimes;
}
