export function getWeekNumber(date: Date): number {
  const targetDate = new Date(date.getTime());

  // Set to nearest Thursday (ISO weeks start on Monday, so Thursday is middle of week)
  targetDate.setHours(0, 0, 0, 0);
  targetDate.setDate(targetDate.getDate() + 3 - ((targetDate.getDay() + 6) % 7));

  // Get first day of year
  const firstDayOfYear = new Date(targetDate.getFullYear(), 0, 1);

  // Calculate week number: 1 + number of weeks between target date and first day of year
  const weekNumber = 1 + Math.floor((targetDate.getTime() - firstDayOfYear.getTime()) / (7 * 24 * 3600 * 1000));

  return weekNumber;
}
