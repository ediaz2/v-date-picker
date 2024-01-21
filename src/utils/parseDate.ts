import { type CalendarDate, parseDate as parse } from '@internationalized/date';
import { getDay } from './getDay';

import { type ShallowReactive, shallowReactive } from 'vue';
import { formatDate } from './formatDate';

export const parseDate = (date: Date, locale: string): CalendarDate => {
	const isoString = formatDate(date, 'yyyy-MM-dd', locale);

	return parse(isoString);
};

const createMapEntry = (date: Date, locale: string): [string, CalendarDate] => {
	return [getDay(date, locale), parseDate(date, locale)];
};

export const parseDateToMap = (
	locale: string,
	date?: Date | Date[],
): ShallowReactive<Map<string, CalendarDate>> => {
	if (!date) {
		return shallowReactive<Map<string, CalendarDate>>(new Map());
	}

	if (Array.isArray(date)) {
		return shallowReactive(new Map(date.map((d) => createMapEntry(d, locale))));
	}

	return shallowReactive(new Map([createMapEntry(date, locale)]));
};
