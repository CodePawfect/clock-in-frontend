import {CalendarIcon, ChevronLeftIcon, ChevronRightIcon, PlusIcon} from '@heroicons/react/24/solid';
import useIsMobile from "../../shared/hooks/useIsMobile.ts";
import {getWeekNumber} from '../../shared/dateUtils';
import {useFetchWorkTime} from '../hooks/useFetchWorkTime.ts';
import {useAddWorkTimeModal} from "../hooks/useAddWorkTimeModal.ts";
import {AddWorkTimeModal} from "./AddWorkTimeModal.tsx";
import WorkTimeTable from "./WorkTimeTable.tsx";

const WorkTimePage = () => {
    const currentDate = new Date();
    const weekNumber = getWeekNumber(currentDate);
    const year = currentDate.getFullYear();
    const {workTimes, loading, error, fetchWorkTimes} = useFetchWorkTime(weekNumber, year);
    const monthName = currentDate.toLocaleString('default', {month: 'short'});

    const {
        open,
        setOpen,
        setNewWorkTimeDate,
        setNewWorkTimeHours,
        setNewWorkTimeNote,
        createWorkTime
    } = useAddWorkTimeModal();

    const isMobile = useIsMobile();
    const captureWorkTimeButtonText = isMobile ? <PlusIcon className="h-5 w-8"/> : "+ Erfassen";

    const reFetchOnWorkTimeAdded = async () => {
        return await fetchWorkTimes();
    }


    return (
        <>
            <div className="p-2 border-b border-b-gray-300 bg-white">
                <h1 className="text-2xl text-indigo-900 font-bold">Stundentafel</h1>
            </div>
            <div className="flex justify-between items-center mx-5 mt-7">
                <div className="inline-flex rounded-b-sm border border-gray-300">
                    <button
                        className="px-4 py-2 bg-white text-gray-800 font-medium text-sm hover:bg-indigo-100"
                    >
                        Heute
                    </button>
                    {!isMobile ? (
                        <>
                            <div className="border-l border-gray-200"></div>
                            <button className="px-2 py-2 bg-white text-gray-600 hover:bg-indigo-100">
                                {<CalendarIcon className="h-5 w-5"/>}
                            </button>
                        </>
                    ) : null}
                </div>
                <div className="inline-flex items-center">
                    <button
                        className="p-1 hover:bg-indigo-100 rounded-full transition-colors"
                    >
                        <ChevronLeftIcon className="h-5 w-5"/>
                    </button>
                    <div className="font-medium text-lg mx-2">
                        <span className="text-indigo-900">{monthName} {year}</span>
                        <span className="text-gray-400">/ KW{weekNumber}</span>
                    </div>
                    <button
                        className="p-1 hover:bg-indigo-100 rounded-full transition-colors"
                    >
                        <ChevronRightIcon className="h-5 w-5"/>
                    </button>
                </div>
                <button
                    onClick={() => setOpen(true)}
                    className="px-4 py-2 bg-indigo-900 text-white font-medium text-sm hover:bg-indigo-600 rounded-md border border-indigo-900">
                    {captureWorkTimeButtonText}
                </button>
            </div>

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
                    <WorkTimeTable
                        workTimes={workTimes}
                    />
                )}
            </div>
            {open && (
                <AddWorkTimeModal
                    setOpen={setOpen}
                    setNewWorkTimeDate={setNewWorkTimeDate}
                    setNewWorkTimeHours={setNewWorkTimeHours}
                    setNewWorkTimeNote={setNewWorkTimeNote}
                    createWorkTime={createWorkTime}
                    onWorkTimeAdded={reFetchOnWorkTimeAdded}
                />
            )}
        </>
    );
}

export default WorkTimePage;
