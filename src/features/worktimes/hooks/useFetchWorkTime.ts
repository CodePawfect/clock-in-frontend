import {useEffect, useState} from 'react';
import {SingleWorkTimeResponse} from "../types/GetWorkTimesResponse.ts";
import {WorkTime} from "../types/WorkTime.ts";

export const useFetchWorkTime = (weekNumber: number, year: number) => {
    const [workTimes, setWorkTimes] = useState<WorkTime[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchWorkTimes = async () => {
        setLoading(true);
        try {
            const baseUrl = import.meta.env.VITE_API_BASE_URL;
            const getWorkTimesUrl = `${baseUrl}/api/worktimes/${weekNumber}/${year}`;
            const response = await fetch(getWorkTimesUrl, {
                method: "GET",
                headers: {
                    "Accept": "application/json"
                },
                credentials: "include"
            });
            if (!response.ok) {
                setError(new Error('Network response was not ok'));
                return;
            }
            const GetWorkTimesResponse = await response.json();
            const mappedWorkTimes = GetWorkTimesResponse.workTimes.map(
                (singleWorkTimeResponse: SingleWorkTimeResponse): WorkTime => ({
                    id: singleWorkTimeResponse.id,
                    username: singleWorkTimeResponse.username,
                    date: singleWorkTimeResponse.date,
                    hoursWorked: singleWorkTimeResponse.hoursWorked,
                    year: singleWorkTimeResponse.year,
                    calenderWeek: singleWorkTimeResponse.calenderWeek,
                    note: singleWorkTimeResponse.note
                })
            );
            setWorkTimes(mappedWorkTimes);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Unknown error occurred'));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWorkTimes().then();
    }, [weekNumber, year]);

    return {workTimes, loading, error, fetchWorkTimes};
};
