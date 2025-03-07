import {useEffect, useState} from 'react';
import {getWeekNumber} from '../../shared/dateUtils';

type WorkTimeResponse = {
    id: number;
    date: string; // The API returns dates as strings
    hours: number;
    note: string;
};

type WorkTime = {
    id: number;
    date: Date;
    hours: number;
    note: string;
};

export const useFetchWorkTime = (initialWeekNumber?: number, initialYear?: number) => {
    const [data, setData] = useState<WorkTime[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [weekNumber, setWeekNumber] = useState<number>(initialWeekNumber || getWeekNumber(new Date()));
    const [year, setYear] = useState<number>(initialYear || new Date().getFullYear());

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const baseUrl = import.meta.env.VITE_API_BASE_URL;
            const apiUrlTemplate = import.meta.env.VITE_API_GET_WEEK_URL;
            const apiUrl = baseUrl + apiUrlTemplate
                .replace('{weekNumber}', String(weekNumber))
                .replace('{year}', String(year));

            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();

            // Transform the dates from strings to Date objects
            const transformedData: WorkTime[] = result.map((item: WorkTimeResponse) => ({
                ...item,
                date: new Date(item.date)
            }));

            setData(transformedData);
        } catch (error) {
            setError(error instanceof Error ? error : new Error('An unknown error occurred'));
            console.error('Error fetching work-time:', error);
        } finally {
            setLoading(false);
        }
    };

    // Function to change the week/year
    const changeWeek = (newWeekNumber: number, newYear: number) => {
        setWeekNumber(newWeekNumber);
        setYear(newYear);
    };

    // Fetch data when component mounts or when week/year changes
    useEffect(() => {
        fetchData();
    }, [weekNumber, year]);

    return {data, loading, error, changeWeek, weekNumber, year, refetch: fetchData};
};
