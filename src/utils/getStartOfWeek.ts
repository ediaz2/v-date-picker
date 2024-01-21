import { type DateValue, getDayOfWeek } from '@internationalized/date';

export const getStartOfWeek = (
	date: DateValue,
	locale: string,
	startOfWeek = 0,
) => {
	const day = getDayOfWeek(date, locale);
	const diff = (day - startOfWeek + 7) % 7;

	return date.subtract({ days: diff });
};
