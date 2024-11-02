import DateRangeError from "./DateRangeError";
import { dateDiffInDays } from "./utils";

export type DateRangeDate = Date | undefined;

export default class DateRange {
  _fromDate: DateRangeDate;
  _toDate: DateRangeDate;

  constructor(from: DateRangeDate, to: DateRangeDate) {
    this._fromDate = from;
    this._toDate = to;
  }

  public get fromDate(): DateRangeDate {
    return this._fromDate;
  }

  public set fromDate(fromDate: DateRangeDate) {
    this._fromDate = fromDate;
  }

  public get toDate(): DateRangeDate {
    return this._toDate;
  }

  public set toDate(toDate: DateRangeDate) {
    this._toDate = toDate;
  }

  public toString() {
    return !this.validate().length
      ? `${this.fromDate?.toDateString()} - ${this._toDate?.toDateString()}`
      : "";
  }

  validate() {
    const errors: DateRangeError[] = [];
    if (!this._fromDate) {
      errors.push(new DateRangeError("From date is required", this));
      return errors;
    }
    if (!this._toDate) {
      errors.push(new DateRangeError("To date is required", this));
      return errors;
    }
    if (this._fromDate > this._toDate) {
      errors.push(
        new DateRangeError("From date should be lessar than the to date", this)
      );
    }
    if ([0, 6].includes(this._fromDate.getDay())) {
      errors.push(new DateRangeError("From date should be a weekday", this));
    }
    if ([0, 6].includes(this._toDate.getDay())) {
      errors.push(new DateRangeError("To date should be a weekday", this));
    }

    if (dateDiffInDays(this._fromDate, this._toDate) > 60) {
      errors.push(
        new DateRangeError("Date range cannot be more than 60 days", this)
      );
    }
    return errors;
  }

  getWeekEnds() {
    const result: string[][] = [];
    if (!this._fromDate || !this._toDate) {
      return result;
    }
    let we1 = new Date(this._fromDate);
    const sat = 6 - we1.getDay();
    we1.setDate(we1.getDate() + sat);
    while (we1 && we1 <= this._toDate) {
      const we2 = new Date(we1);
      we2.setDate(we1.getDate() + 1);
      result.push([we1.toLocaleDateString(), we2.toLocaleDateString()]);
      we1.setDate(we2.getDate() + 6);
    }
    return result;
  }

  getResult() {
    if (!this._fromDate || !this._toDate) {
      return {};
    }
    return {
      dataRange: [
        this._fromDate?.toLocaleDateString(),
        this._toDate?.toLocaleDateString(),
      ],
      weekEnds: this.getWeekEnds(),
    };
  }
}
