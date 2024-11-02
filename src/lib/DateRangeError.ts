import DateRange from "./DateRange";

export default class DateRangeError {
  private _message: string;
  private _dateRange!: DateRange;
  constructor(message: string, dateRange: DateRange) {
    this._message = message;
    this._dateRange = dateRange;
  }

  public get message() {
    return this._message;
  }

  public get dateRange() {
    return this._dateRange;
  }
}
