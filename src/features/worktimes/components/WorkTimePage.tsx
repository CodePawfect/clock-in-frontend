import {CalendarIcon, ChevronLeftIcon, ChevronRightIcon, PlusIcon} from '@heroicons/react/24/solid';
import useIsMobile from "../../shared/hooks/useIsMobile.ts";
import {getWeekNumber} from '../../shared/dateUtils';
import {useFetchWorkTime} from '../hooks/useFetchWorkTime.ts';
import {useAddWorkTimeModal} from "../hooks/useAddWorkTimeModal.ts";
import {AddWorkTimeModal} from "./AddWorkTimeModal.tsx";

const WorkTimePage = () => {
    const currentDate = new Date();
    const weekNumber = getWeekNumber(currentDate);
    const year = currentDate.getFullYear();
    const {workTimes, loading, error} = useFetchWorkTime(weekNumber, year);
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
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead className="bg-gray-100">
                        <tr>
                            <th className="py-2 px-4 border-b text-indigo-900 text-left">Datum</th>
                            <th className="py-2 px-4 border-b text-indigo-900 text-left">Stunden</th>
                            <th className="py-2 px-4 border-b text-indigo-900 text-left">Notiz</th>
                        </tr>
                        </thead>
                        <tbody>
                        {workTimes.length > 0 ? (
                            workTimes.map((workTime, index) => (
                                <tr key={index} className="hover:bg-indigo-100">
                                    <td className="py-2 px-4 border border-gray-300">
                                        {new Date(workTime.date).toLocaleDateString('de-DE')}
                                    </td>
                                    <td className="py-2 px-4 border border-gray-300">
                                        {workTime.hoursWorked}
                                    </td>
                                    <td className="py-2 px-4 border border-gray-300">
                                        {workTime.note}
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
                )}
            </div>
            {open && (
                <AddWorkTimeModal
                    setOpen={setOpen}
                    setNewWorkTimeDate={setNewWorkTimeDate}
                    setNewWorkTimeHours={setNewWorkTimeHours}
                    setNewWorkTimeNote={setNewWorkTimeNote}
                    createWorkTime={createWorkTime}
                />
            )}
        </>
    );
}

export default WorkTimePage;
