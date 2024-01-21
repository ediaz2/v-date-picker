import { parseDate } from '@internationalized/date';
import { formatDate } from './formatDate';

export const getDay = (date: Date, locale: string) => {
	return formatDate(date, 'yyyy-MM-dd', locale);
};

export const getDayISO = (date: string, timeZone: string) => {
	return parseDate(date).toDate(timeZone);
};
