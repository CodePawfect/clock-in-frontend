import { WorkTime } from '../types/WorkTime.ts';
import { TrashIcon } from '@heroicons/react/24/solid';

const WorkTimeTable = ({
  workTimes,
  deleteWorkTime,
  reFetchWorkTimes,
}: {
  workTimes: WorkTime[];
  deleteWorkTime: (id: string) => Promise<void>;
  reFetchWorkTimes: () => Promise<void>;
}) => {
  const handleDelete = async (id: string) => {
    await deleteWorkTime(id)
      .then(() => reFetchWorkTimes())
      .catch((error) => console.error('Error deleting or refreshing:', error));
  };

  return (
    <table className="min-w-full bg-white border border-gray-200">
      <thead className="bg-gray-100">
        <tr>
          <th className="py-2 px-4 border-b text-indigo-900 text-left">Datum</th>
          <th className="py-2 px-4 border-b text-indigo-900 text-left">Stunden</th>
          <th className="py-2 px-4 border-b text-indigo-900 text-left">Notiz</th>
          <th className="py-1 px-2 border-b text-indigo-900 w-12 text-center">Aktionen</th>
        </tr>
      </thead>
      <tbody>
        {workTimes.length > 0 ? (
          workTimes.map((workTime) => (
            <tr key={workTime.id} className="hover:bg-indigo-100">
              <td className="py-2 px-4 border border-gray-300">
                {new Date(workTime.date).toLocaleDateString('de-DE')}
              </td>
              <td className="py-2 px-4 border border-gray-300">{workTime.hoursWorked}</td>
              <td className="py-2 px-4 border border-gray-300">{workTime.note}</td>
              <td className="py-2 px-0 border border-gray-300 w-12">
                <div className="flex justify-center items-center">
                  <button className="focus:outline-none" aria-label="Delete" onClick={() => handleDelete(workTime.id)}>
                    <TrashIcon className="h-5 w-5 text-red-500 hover:text-red-700" />
                  </button>
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={3} className="py-4 text-center text-gray-500">
              Keine Arbeitszeiten für diese Woche gefunden
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default WorkTimeTable;
