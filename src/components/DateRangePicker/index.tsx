import React, { useEffect, useRef, useState } from "react";
import DatePicker from "../DatePicker";
import clsx from "clsx";
import styles from "./DateRangePicker.module.css";
import DateRange from "../../lib/DateRange";
import DateIcon from "./DateIcon";
import DateRangeError from "../../lib/DateRangeError";
import { DATE_RANGES } from "../../lib/constants";
import { getPreDefinedDateRanges } from "../../lib/utils";

type Props = {};

function DateRangePicker({}: Props) {
  const [showDateRange, setShowDateRange] = useState(false);
  const [dateRange, setDateRange] = useState(
    new DateRange(undefined, undefined)
  );

  const [fromDate, setFromDate]: [Date | undefined, Function] = useState(
    dateRange.fromDate
  );
  const [toDate, setToDate]: [Date | undefined, Function] = useState(
    dateRange.toDate
  );

  const [errors, setErrors]: [DateRangeError[], Function] = useState([]);

  const dateRangeRef = useRef<HTMLInputElement>(null);
  const dateRangePickerRef = useRef<HTMLDivElement>(null);

  const result = dateRange.getResult();

  function onDateRangeClick(e: any) {
    e.preventDefault();
    e.stopPropagation();
    toggleDateRange();
  }

  function onDateRangeSelect(e: any) {
    e.preventDefault();
    e.stopPropagation();
    toggleDateRange();
    let dateRange = new DateRange(fromDate, toDate);
    const errors = dateRange.validate();
    if (errors.length) {
      setErrors(errors);
      setDateRange(new DateRange(undefined, undefined));
    } else {
      setErrors([]);
      setDateRange(dateRange);
    }
  }

  function toggleDateRange() {
    setShowDateRange(!showDateRange);
  }

  function onFromSelect(date: Date) {
    setFromDate(date);
  }

  function onToSelect(date: Date) {
    setToDate(date);
  }

  function onPreDefinedRangeClick(e: any) {
    e.preventDefault();
    e.stopPropagation();
    const { id } = e.target;
    const ranges = getPreDefinedDateRanges();
    const dateRange = ranges[id]();
    setDateRange(dateRange);
    setFromDate(dateRange.fromDate);
    setToDate(dateRange.toDate);
    toggleDateRange();
  }

  useEffect(() => {
    if (dateRangeRef.current && dateRangePickerRef.current) {
      const { top, left } = dateRangeRef.current.getBoundingClientRect();
      dateRangePickerRef.current.style.top = top + 45 + "px";
      dateRangePickerRef.current.style.left = left + "px";
    }
    document.addEventListener("click", () => {
      setShowDateRange(false);
    });
  }, []);

  return (
    <div className={styles.parent}>
      <div className={styles.rangePicker}>
        <div className={styles.datePicker}>
          <label>Date Range:</label>
          <input type="text" value={dateRange.toString()} ref={dateRangeRef} />
          <div onClick={onDateRangeClick} className={styles.calIcon}>
            <DateIcon />
          </div>
          <div className={styles.errors}>
            {errors.map((e) => (
              <div>{e.message}</div>
            ))}
          </div>
          <div
            className={clsx(showDateRange ? "show" : "hidden", styles.modal)}
            ref={dateRangePickerRef}
          >
            <div className={styles.datePickerBody}>
              <div>
                <DatePicker date={dateRange.fromDate} onSelect={onFromSelect} />
              </div>
              <div>
                <DatePicker date={dateRange.toDate} onSelect={onToSelect} />
              </div>
            </div>
            <div className={styles.datePickerFooter}>
              <div className={styles.preDefinedRanges}>
                <a
                  href="javascript:void"
                  id={DATE_RANGES.LAST_7_DAYS.toString()}
                  onClick={onPreDefinedRangeClick}
                >
                  Last 7 days
                </a>
                <a
                  href="javascript:void"
                  id={DATE_RANGES.LAST_30_DAYS.toString()}
                  onClick={onPreDefinedRangeClick}
                >
                  Last 30 days
                </a>
              </div>
              <div>
                <button onClick={onDateRangeSelect}>Ok</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {!errors.length && result.dataRange?.[0] && (
        <div className={styles.result}>
          <div>
            <h3>Selected Range</h3>
            <div>{`${result.dataRange?.[0]} - ${result.dataRange?.[1]}`}</div>
          </div>
          <div>
            <h3>Weekends</h3>
            {result.weekEnds?.map((we) => (
              <div>{`${we[0]} - ${we[1]}`}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default DateRangePicker;
