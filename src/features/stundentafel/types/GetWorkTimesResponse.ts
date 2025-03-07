export type GetWorkTimesResponse = {
    workTimes: WorkTime[];
}

export type WorkTime = {
    username: string;
    date: string;
    hoursWorked: number;
    year: number;
    calenderWeek: number;
}