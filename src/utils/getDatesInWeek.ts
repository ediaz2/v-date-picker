import { type DateValue } from '@internationalized/date';

export const getDatesInWeek = (weekStart: DateValue) => {
  return [...new Array(7).keys()].map((index) => {
    return weekStart.add({ days: index });
  });
};
