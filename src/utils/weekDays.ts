import { startOfWeek, type CalendarDate } from '@internationalized/date';

export const weekDays = (
	date: CalendarDate,
	locale: string,
): CalendarDate[] => {
	const weekStart = startOfWeek(date, locale);
	return [...new Array(7).keys()].map((index) => {
		return weekStart.add({ days: index });
	});
};
