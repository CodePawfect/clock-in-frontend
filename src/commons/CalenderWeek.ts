export class CalendarWeek {
  /**
   * Returns the ISO week number (1–53) for the given date.
   * @param date — the Date to compute the week for (defaults to now)
   */
  public static getWeek(date: Date = new Date()): number {
    // Copy date and convert to UTC to avoid timezone issues
    const d = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    );
    // ISO week day: Monday = 1 ... Sunday = 7
    const dayNum = d.getUTCDay() === 0 ? 7 : d.getUTCDay();
    // Move to nearest Thursday: current date + (4 - dayNum) days
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    // d is now the Thursday in the target week; ISO week‐year is its year
    const isoYearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    // Calculate full weeks to that Thursday
    const weekNumber = Math.ceil(
      ((d.getTime() - isoYearStart.getTime()) / 86400000 + 1) / 7
    );
    return weekNumber;
  }
}
