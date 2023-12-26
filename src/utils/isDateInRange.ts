import { DateValue } from '@internationalized/date';

interface IsDateInRange {
  day: DateValue;
  start?: DateValue;
  end?: DateValue;
  timeZone: string;
}

export const isDateInRange = ({ day, start, end, timeZone }: IsDateInRange) => {
  if (!start || !end) return false;

  const _start = start.toDate(timeZone);
  const _end = end.toDate(timeZone);
  const _date = day.toDate(timeZone);

  const [earlierDate, laterDate] =
    _start < _end ? [_start, _end] : [_end, _start];

  return _date >= earlierDate && _date <= laterDate;
};
