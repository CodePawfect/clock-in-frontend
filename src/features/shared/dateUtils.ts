export function getWeekNumber(date: Date): number {
    // Create a new date object for the first day of the year
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);

    // Calculate days since first day of the year
    const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;

    // Return the week number
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}