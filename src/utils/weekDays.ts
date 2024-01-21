import {
	startOfWeek as startOfWeekFn,
	type CalendarDate,
} from '@internationalized/date';

export const weekDays = (
	date: CalendarDate,
	locale: string,
	startOfWeek = 0,
): CalendarDate[] => {
	const weekStart = startOfWeekFn(date, locale);
	const day = weekStart.add({ days: startOfWeek % 7 });
	return [...new Array(7).keys()].map((index) => {
		return day.add({ days: index });
	});
};
