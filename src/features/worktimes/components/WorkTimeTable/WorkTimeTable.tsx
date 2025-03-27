import { WorkTime } from './models/WorkTime.ts';

function WorkTimeTable({ workTimes }: { workTimes: WorkTime[] }) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Hours</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          {workTimes.map((workTime) => (
            <tr key={workTime.id}>
              <td>{workTime.date}</td>
              <td>{workTime.hours}</td>
              <td>{workTime.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default WorkTimeTable;
