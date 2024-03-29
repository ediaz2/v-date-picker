import type { CalendarRootProps } from './calendar';

export interface CalendarRangeRootProps
	extends Omit<CalendarRootProps, 'selected'> {
	minValue?: Date;
	maxValue?: Date;
	selected?: [Date, Date];
}

export type CalendarRangeRootEmits = {
	'update:selected': [value: [Date, Date]];
	'update:month': [value: Date];
};
