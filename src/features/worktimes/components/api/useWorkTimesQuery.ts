import { WorkTime } from '../types/WorkTime.ts';
import { useQuery } from '@tanstack/react-query';

/**
 * Custom hook to fetch work times for a given week and year
 * @param week week of the year
 * @param year year
 */
export function useWorkTimesQuery(week: number, year: number) {
  return useQuery({
    queryKey: ['worktimes', week, year],
    queryFn: () => fetchWorkTimes(week, year),
  });
}

/**
 * Fetch work times for a given week and year
 * @param week week of the year
 * @param year year
 */
async function fetchWorkTimes(week: number, year: number): Promise<WorkTime[]> {
  const res = await fetch(
    `http://localhost:8080/api/worktimes/${week}/${year}`,
    { credentials: 'include' }
  );

  if (!res.ok) throw new Error('Network response was not ok');

  const { workTimes } = (await res.json()) as { workTimes: WorkTime[] };

  return workTimes;
}
