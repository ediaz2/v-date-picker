import { type CalendarDate, toCalendarDateTime } from '@internationalized/date';

const FORMATTERS: Record<string, (date: Date, locale: string) => string> = {
  // Time in ms
  T: (date) => '' + date.getTime(),
  // Seconds
  s: (date, locale) => date.toLocaleString(locale, { second: 'numeric' }),
  ss: (date, locale) => date.toLocaleString(locale, { second: '2-digit' }),
  // Minutes
  m: (date, locale) => date.toLocaleString(locale, { minute: 'numeric' }),
  mm: (date, locale) => date.toLocaleString(locale, { minute: '2-digit' }),
  // Hours
  h: (date, locale) =>
    date.toLocaleString(locale, { hour: 'numeric', hour12: true }),
  hh: (date, locale) =>
    date.toLocaleString(locale, { hour: '2-digit', hour12: true }),
  H: (date, locale) =>
    date.toLocaleString(locale, { hour: 'numeric', hour12: false }),
  HH: (date, locale) =>
    date.toLocaleString(locale, { hour: '2-digit', hour12: false }),

  // Day period
  aa: (date, locale) =>
    date
      .toLocaleString(locale, { hour: 'numeric', hour12: true })
      .toLowerCase(),
  AA: (date, locale) =>
    date
      .toLocaleString(locale, { hour: 'numeric', hour12: true })
      .toUpperCase(),

  // Day of week
  E: (date, locale) => date.toLocaleString(locale, { weekday: 'short' }),
  EE: (date, locale) => date.toLocaleString(locale, { weekday: 'short' }),
  EEE: (date, locale) => date.toLocaleString(locale, { weekday: 'short' }),
  EEEE: (date, locale) => date.toLocaleString(locale, { weekday: 'long' }),
  EEEEE: (date, locale) => date.toLocaleString(locale, { weekday: 'narrow' }),

  // Date of month
  d: (date, locale) => date.toLocaleString(locale, { day: 'numeric' }),
  dd: (date, locale) => date.toLocaleString(locale, { day: '2-digit' }),

  // Months
  M: (date, locale) => date.toLocaleString(locale, { month: 'numeric' }),
  MM: (date, locale) => date.toLocaleString(locale, { month: '2-digit' }),
  MMM: (date, locale) => date.toLocaleString(locale, { month: 'short' }),
  MMMM: (date, locale) => date.toLocaleString(locale, { month: 'long' }),

  // Years
  yy: (date, locale) => date.toLocaleString(locale, { year: '2-digit' }),
  yyyy: (date, locale) => date.toLocaleString(locale, { year: 'numeric' }),
  YY: (date, locale) => date.toLocaleString(locale, { year: '2-digit' }),
  YYYY: (date, locale) => date.toLocaleString(locale, { year: 'numeric' }),
};

const ESCAPE = '\\[[^\\[\\]]*\\]';

const createMatcher = (): RegExp => {
  const matchers = Object.keys(FORMATTERS)
    .sort((a, b) => b.length - a.length)
    .concat(ESCAPE);
  return new RegExp(matchers.join('|'), 'g');
};

export const formatDate = (
  date: Date,
  format: string,
  locale: string,
): string => {
  return format.replace(createMatcher(), (token: string) => {
    if (Object.prototype.hasOwnProperty.call(FORMATTERS, token)) {
      return FORMATTERS[token](date, locale);
    }
    return token.replace(/\[|\]/g, '');
  });
};

export const formatCalendarDate = (
  value: CalendarDate,
  format: string,
  locale: string,
  timeZone: string,
): string => {
  const datetime = toCalendarDateTime(value);
  const date = datetime.toDate(timeZone);
  return formatDate(date, format, locale);
};
