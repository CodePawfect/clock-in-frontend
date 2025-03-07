import {useState} from 'react';
import {CalendarIcon, ChevronLeftIcon, ChevronRightIcon, PlusIcon} from '@heroicons/react/24/solid';
import useIsMobile from "../../shared/hooks/useIsMobile.ts";
import {useFetchWorkTime} from "../hooks/useFetchWorkTime";
import {getWeekNumber} from '../../shared/dateUtils';
import {addWeeks} from "date-fns";

const Stundentafel = () => {
    const isMobile = useIsMobile();
    const [currentDate, setCurrentDate] = useState(new Date());

    // Get the week number and year from the current date
    const weekNumber = getWeekNumber(currentDate);
    const year = currentDate.getFullYear();

    // Use our custom hook
    const {data: entries, loading, error, changeWeek} = useFetchWorkTime(weekNumber, year);

    // Function to navigate to previous week
    const goToPreviousWeek = () => {
        const newDate = addWeeks(currentDate, -1);
        setCurrentDate(newDate);
        changeWeek(getWeekNumber(newDate), newDate.getFullYear());
    };

    // Function to navigate to next week
    const goToNextWeek = () => {
        const newDate = addWeeks(currentDate, 1);
        setCurrentDate(newDate);
        changeWeek(getWeekNumber(newDate), newDate.getFullYear());
    };

    // Function to go to today
    const goToToday = () => {
        const today = new Date();
        setCurrentDate(today);
        changeWeek(getWeekNumber(today), today.getFullYear());
    };

    const captureButtonContent = isMobile ? <PlusIcon className="h-5 w-8"/> : "+ Erfassen";

    // Format the current month and year
    const monthName = currentDate.toLocaleString('default', {month: 'short'});

    return (
        <>
            <div className="p-2 border-b border-b-gray-300 bg-white">
                <h1 className="text-2xl text-indigo-900 font-bold">Stundentafel</h1>
            </div>
            <div className="flex justify-between items-center mx-5 mt-7">
                <div className="inline-flex rounded-b-sm border border-gray-300">
                    <button
                        className="px-4 py-2 bg-white text-gray-800 font-medium text-sm hover:bg-indigo-100"
                        onClick={goToToday}
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
                        onClick={goToPreviousWeek}
                    >
                        <ChevronLeftIcon className="h-5 w-5"/>
                    </button>
                    <div className="font-medium text-lg mx-2">
                        <span className="text-indigo-900">{monthName} {year}</span>
                        <span className="text-gray-400">/ KW{weekNumber}</span>
                    </div>
                    <button
                        className="p-1 hover:bg-indigo-100 rounded-full transition-colors"
                        onClick={goToNextWeek}
                    >
                        <ChevronRightIcon className="h-5 w-5"/>
                    </button>
                </div>
                <button
                    className="px-4 py-2 bg-indigo-900 text-white font-medium text-sm hover:bg-indigo-600 rounded-md border border-indigo-900">
                    {captureButtonContent}
                </button>
            </div>
            <div className="mt-10">
                {loading && <p className="text-center">Loading...</p>}
                {error && <p className="text-center text-red-500">Error loading data: {error.message}</p>}
                {!loading && !error && (
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead className="bg-gray-100">
                        <tr>
                            <th className="py-2 px-4 border-b text-indigo-900 text-left">Datum</th>
                            <th className="py-2 px-4 border-b text-indigo-900 text-left">Stunden</th>
                            <th className="py-2 px-4 border-b text-indigo-900 text-left">Notiz</th>
                        </tr>
                        </thead>
                        <tbody>
                        {entries.map((entry) => (
                            <tr key={entry.id} className="hover:bg-indigo-100">
                                <td className="py-2 px-4 border border-gray-300">{entry.date.toLocaleDateString()}</td>
                                <td className="py-2 px-4 border border-gray-300">{entry.hours}</td>
                                <td className="py-2 px-4 border border-gray-300">{entry.note}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
}

export default Stundentafel;
