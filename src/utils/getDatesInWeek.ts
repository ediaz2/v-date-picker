import type { CalendarDate } from '@internationalized/date';

export const getDatesInWeek = (weekStart: CalendarDate) => {
	return [...new Array(7).keys()].map((index) => {
		return weekStart.add({ days: index });
	});
};
