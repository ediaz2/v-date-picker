import type { CalendarRootProps } from './calendar';

export interface CalendarMultipleRootProps
	extends Omit<CalendarRootProps, 'selected'> {
	selected?: Date[];
}

export type CalendarMultipleRootEmits = {
	'update:selected': [value: Date[]];
	'update:month': [value: Date];
};
