import { startOfWeek, type DateValue } from '@internationalized/date';

export const weekDays = (date: DateValue, locale: string): DateValue[] => {
  const weekStart = startOfWeek(date, locale);
  return [...new Array(7).keys()].map((index) => {
    return weekStart.add({ days: index });
  });
};
