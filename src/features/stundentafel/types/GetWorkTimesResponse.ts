export type GetWorkTimesResponse = {
    workTimes: SingleWorkTimeResponse[];
}

export type SingleWorkTimeResponse = {
    username: string;
    date: string;
    hoursWorked: number;
    year: number;
    calenderWeek: number;
}