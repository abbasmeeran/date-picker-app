import React, { useState } from "react";

type Props = {
  date: Date;
  prev: boolean;
  onChange: Function;
};

function MonthPicker({ date, prev = true, onChange }: Props) {
  function onMonthChange(e: any) {
    e.preventDefault();
    e.stopPropagation();
    const newDate = new Date(date);
    let newMonth = newDate.getMonth() + (prev ? -1 : 1);
    newDate.setMonth(newMonth);
    newDate.setDate(1);
    onChange(newDate);
  }

  return (
    <div>
      <button onClick={onMonthChange}>{prev ? "<<" : ">>"}</button>
    </div>
  );
}

export default MonthPicker;
