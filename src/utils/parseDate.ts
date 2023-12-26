import { DateValue, parseDate as parse } from '@internationalized/date';
import { getDay } from './getDay';

import { ShallowReactive, shallowReactive } from 'vue';

const createMapEntry = (date: Date): [string, DateValue] => {
  const isoString = date.toISOString();
  return [getDay(date), parse(isoString)];
};

export const parseDateToMap = (
  date?: Date | Date[],
): ShallowReactive<Map<string, DateValue>> => {
  if (!date) {
    return shallowReactive<Map<string, DateValue>>(new Map());
  }

  if (Array.isArray(date)) {
    return shallowReactive(new Map(date.map(createMapEntry)));
  }

  return shallowReactive(new Map([createMapEntry(date)]));
};
