import useIsMobile from '../../shared/hooks/useIsMobile.ts';
import { getWeekNumber } from '../../shared/dateUtils';
import { useFetchWorkTime } from '../hooks/useFetchWorkTime.ts';
import { useAddWorkTimeModal } from '../hooks/useAddWorkTimeModal.ts';
import { AddWorkTimeModal } from './AddWorkTimeModal.tsx';
import WorkTimeTable from './WorkTimeTable.tsx';
import WorkTimeHeader from './WorkTimeHeader.tsx';
import useDeleteWorkTime from '../hooks/useDeleteWorkTime.ts';

const WorkTimePage = () => {
  const today = new Date();
  const weekNumber = getWeekNumber(today);
  const year = today.getFullYear();
  const { workTimes, loading, error, fetchWorkTimes } = useFetchWorkTime(weekNumber, year);
  const deleteWorkTime = useDeleteWorkTime();

  const { open, setOpen, setNewWorkTimeDate, setNewWorkTimeHours, setNewWorkTimeNote, createWorkTime } =
    useAddWorkTimeModal();

  const isMobile = useIsMobile();

  return (
    <>
      <WorkTimeHeader isMobile={isMobile} today={new Date()} setOpen={setOpen} />

      <div className="mt-10">
        {loading ? (
          <div className="text-center py-4">
            <p>Lade Arbeitszeitdaten...</p>
          </div>
        ) : error ? (
          <div className="text-center py-4 text-red-600">
            <p>Fehler beim Laden der Daten: {error.message}</p>
          </div>
        ) : (
          <WorkTimeTable workTimes={workTimes} deleteWorkTime={deleteWorkTime} reFetchWorkTimes={fetchWorkTimes} />
        )}
      </div>

      {open && (
        <AddWorkTimeModal
          setOpen={setOpen}
          setNewWorkTimeDate={setNewWorkTimeDate}
          setNewWorkTimeHours={setNewWorkTimeHours}
          setNewWorkTimeNote={setNewWorkTimeNote}
          createWorkTime={createWorkTime}
          reFetchWorkTimes={fetchWorkTimes}
        />
      )}
    </>
  );
};

export default WorkTimePage;
