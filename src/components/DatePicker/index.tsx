import React, { useState } from "react";
import YearPicker from "./YearPicker";
import { getMonthName } from "../../lib/utils";
import MonthPicker from "./MonthPicker";
import DayPicker from "./DayPicker";
import styles from "./DatePicker.module.css";

type Props = {
  date?: Date;
  onSelect: Function;
};

function DatePicker({ date, onSelect }: Props) {
  const [selectedDate, setSelectedDate] = useState(date || new Date());

  function onDateChange(date: Date) {
    setSelectedDate(date);
    onSelect(date);
  }

  function onSelectedDate(date: Date) {
    onSelect(date);
    setSelectedDate(date);
  }

  return (
    <div className={styles.datePicker}>
      <div className={styles.header}>
        <h4>{`${getMonthName(selectedDate)} ${selectedDate.getFullYear()}`}</h4>
        <MonthPicker date={selectedDate} prev onChange={onDateChange} />
        <YearPicker date={selectedDate} onChange={onDateChange} />
        <MonthPicker date={selectedDate} prev={false} onChange={onDateChange} />
      </div>
      <div className={styles.main}>
        <DayPicker date={selectedDate} onChange={onSelectedDate} />
      </div>
      <div className={styles.footer}></div>
    </div>
  );
}

export default DatePicker;
