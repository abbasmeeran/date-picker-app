import React, { ChangeEvent, useState } from "react";
import { MAX_YEAR_COUNT, MIN_YEAR_COUNT } from "../../lib/constants";

type Props = {
  date: Date;
  onChange: Function;
};

function YearPicker({ date, onChange }: Props) {
  const year = date.getFullYear();

  function onYearChange(e: any) {
    e.preventDefault();
    e.stopPropagation();
    const { value } = e.target;
    const newDate = new Date(date);
    newDate.setFullYear(parseInt(value));
    onChange(newDate);
  }

  return (
    <div>
      <select
        value={year}
        onChange={onYearChange}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {getYearOptions(getMinYear(), getMaxYear())}
      </select>
    </div>
  );
}

function getMinYear() {
  const date = new Date();
  date.setFullYear(date.getFullYear() - MIN_YEAR_COUNT);
  return date.getFullYear();
}

function getMaxYear() {
  const date = new Date();
  date.setFullYear(date.getFullYear() + MAX_YEAR_COUNT);
  return date.getFullYear();
}

function getYearOptions(minYear: number, maxYear: number) {
  let options: React.ReactNode[] = [];
  for (let y = minYear; y <= maxYear; y++) {
    options.push(
      <option key={y} value={y}>
        {y}
      </option>
    );
  }
  return options;
}

export default YearPicker;
