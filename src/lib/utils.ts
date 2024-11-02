import { DATE_RANGES, locale } from "./constants";
import DateRange from "./DateRange";

export function getMonthName(date: Date) {
  return date.toLocaleString(locale, { month: "long" });
}

export function getDaysInMonth(month: number, year: number) {
  return new Date(year, month, 0).getDate();
}

export function getDayNames() {
  const names: string[] = [];
  let date = new Date();
  date.setDate(date.getDate() - date.getDay());
  names.push(date.toLocaleString(locale, { weekday: "short" }));

  for (let i = 1; i < 7; i++) {
    date.setDate(date.getDate() + 1);
    names.push(date.toLocaleString(locale, { weekday: "short" }));
  }
  return names;
}

export function isToday(date: Date) {
  let inputDate = new Date(date);
  let todaysDate = new Date();

  return inputDate.setHours(0, 0, 0, 0) == todaysDate.setHours(0, 0, 0, 0);
}

export function dateDiffInDays(from: Date, to: Date) {
  const diff = to.getTime() - from.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  return days;
}

export function getPreDefinedDateRanges(): { [key: string]: Function } {
  return {
    [DATE_RANGES.LAST_7_DAYS]: function () {
      const [startDate, endDate] = getPastRange(new Date(), 7);
      return new DateRange(startDate, endDate);
    },
    [DATE_RANGES.LAST_30_DAYS]: function () {
      const [startDate, endDate] = getPastRange(new Date(), 30);
      return new DateRange(startDate, endDate);
    },
  };
}

function getPastRange(date: Date, pastDays: number) {
  let startDate, endDate;
  let count = 0;
  while (count <= pastDays) {
    date.setDate(date.getDate() - 1);
    if (![0, 6].includes(date.getDay())) {
      if (count === 0) {
        endDate = new Date(date);
      }
      if (count === pastDays) {
        startDate = new Date(date);
      }
      count++;
    }
  }
  return [startDate, endDate];
}
