import { locale } from "./constants";

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
