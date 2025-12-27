export class DateRange {
  private readonly startDate: Date;
  private readonly endDate: Date;

  private constructor(startDate: Date, endDate: Date) {
    this.startDate = startDate;
    this.endDate = endDate;
  }

  static create(startDate: Date, endDate: Date): DateRange {
    this.validate(startDate, endDate);
    return new DateRange(startDate, endDate);
  }

  static createMonth(year: number, month: number): DateRange {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59, 999);
    return new DateRange(startDate, endDate);
  }

  static createYear(year: number): DateRange {
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31, 23, 59, 59, 999);
    return new DateRange(startDate, endDate);
  }

  private static validate(startDate: Date, endDate: Date): void {
    if (!startDate || !endDate) {
      throw new Error('Start date and end date are required');
    }

    if (this.isInvalidDate(startDate)) {
      throw new Error('Invalid start date');
    }

    if (this.isInvalidDate(endDate)) {
      throw new Error('Invalid end date');
    }

    if (this.startIsAfterEnd(startDate, endDate)) {
      throw new Error('Start date cannot be after end date');
    }
  }

  private static isInvalidDate(date: Date): boolean {
    return isNaN(date.getTime());
  }

  private static startIsAfterEnd(startDate: Date, endDate: Date): boolean {
    return startDate.getTime() > endDate.getTime();
  }

  getStartDate(): Date {
    return new Date(this.startDate);
  }

  getEndDate(): Date {
    return new Date(this.endDate);
  }

  contains(date: Date): boolean {
    const timestamp = date.getTime();
    return (
      timestamp >= this.startDate.getTime() &&
      timestamp <= this.endDate.getTime()
    );
  }

  getDurationInDays(): number {
    const diffInMs = this.endDate.getTime() - this.startDate.getTime();
    return Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
  }

  overlaps(other: DateRange): boolean {
    return (
      this.startDate.getTime() <= other.endDate.getTime() &&
      this.endDate.getTime() >= other.startDate.getTime()
    );
  }

  toString(): string {
    return `${this.startDate.toISOString()} - ${this.endDate.toISOString()}`;
  }
}
