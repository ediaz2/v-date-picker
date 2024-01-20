import { type CalendarDate, parseDate as parse } from '@internationalized/date';
import { getDay } from './getDay';

import { type ShallowReactive, shallowReactive } from 'vue';

const createMapEntry = (date: Date): [string, CalendarDate] => {
	const isoString = date.toISOString();
	return [getDay(date), parse(isoString)];
};

export const parseDateToMap = (
	date?: Date | Date[],
): ShallowReactive<Map<string, CalendarDate>> => {
	if (!date) {
		return shallowReactive<Map<string, CalendarDate>>(new Map());
	}

	if (Array.isArray(date)) {
		return shallowReactive(new Map(date.map(createMapEntry)));
	}

	return shallowReactive(new Map([createMapEntry(date)]));
};
