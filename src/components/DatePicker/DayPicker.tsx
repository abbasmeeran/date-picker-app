import React from "react";
import { getDayNames, getDaysInMonth, isToday } from "../../lib/utils";
import styles from "./DatePicker.module.css";
import clsx from "clsx";

type Props = {
  date: Date;
  onChange: Function;
};

function DayPicker({ date, onChange }: Props) {
  const dayNames = getDayNames();
  function onSelect(selectedDate: Date) {
    onChange(selectedDate);
  }

  return (
    <div className={styles.days}>
      {dayNames.map((day) => (
        <div>{day}</div>
      ))}
      {getMonthDays(date, onSelect)}
    </div>
  );
}

function getMonthDays(date: Date, onSelect: Function) {
  let days = [];
  let start = new Date(date.getFullYear(), date.getMonth(), 1);
  start.setDate(start.getDate() - start.getDay());
  const daysInMonth = getDaysInMonth(date.getMonth(), date.getFullYear());
  let end = new Date(date.getFullYear(), date.getMonth(), daysInMonth);
  end.setDate(end.getDate() + (6 - end.getDay()));

  let d = new Date(start);

  while (d <= end) {
    const newDate = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    const selectDate = (e: any) => {
      e.preventDefault();
      e.stopPropagation();
      onSelect(newDate);
    };
    const disabled =
      d.getDay() === 0 || d.getDay() === 6 || d.getMonth() !== date.getMonth();
    days.push(
      <div>
        <button
          key={d.getTime()}
          onClick={selectDate}
          disabled={disabled}
          className={clsx(
            date.getTime() === d.getTime() ? styles.selected : ""
          )}
        >
          {d.getDate()}
        </button>
      </div>
    );
    d.setDate(d.getDate() + 1);
  }
  return days;
}

export default DayPicker;
