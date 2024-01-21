import type { CalendarDate } from '@internationalized/date';
import type { PrimitiveProps } from 'radix-vue';
import type { ComputedRef, ShallowReactive, ShallowRef } from 'vue';

export interface CalendarRootProps extends PrimitiveProps {
	selected?: Date;
	month?: Date;
	timeZone?: string;
	locale?: string;
	disabled?: boolean;
	readOnly?: boolean;
	startOfWeek?: number;
	// visibleDuration
	// pageBehavior
	// minValue
	// maxValue
	// isDateUnavailable
	// check
	// showWeekNumbers
}

export type CalendarRootEmits = {
	'update:selected': [value: Date];
	'update:month': [value: Date];
};

export interface CalendarEventProps {
	selected: ShallowReactive<Map<string, CalendarDate>>;
	day: CalendarDate;
	key: string;
	timeZone: string;
}

export interface CalendarRootContext {
	selected?: Date | Date[];
	month?: Date;
	timeZone: string;
	locale: string;
	startOfWeek?: number;
	disabled: boolean;
	readOnly: boolean;
	onAdditonalProps?: (
		props: CalendarEventProps,
	) => Record<string, string | number | boolean | undefined>;
	onClick: (props: CalendarEventProps) => void;
	onMouseEnter?: (props: CalendarEventProps) => void;
	onMouseLeave?: (props: CalendarEventProps) => void;
	onCheckSelected?: (props: CalendarEventProps) => boolean;
	onUpdatedMonth: (value: Date) => void;
}

export interface CalendarRootInjection {
	month: ShallowRef<CalendarDate>;
	selected: ShallowReactive<Map<string, CalendarDate>>;
	today: CalendarDate;
	locale: ComputedRef<string>;
	startOfWeek: ComputedRef<number | undefined>;
	timeZone: ComputedRef<string>;
	disabled: ComputedRef<boolean>;
	readOnly: ComputedRef<boolean>;
	onAdditonalProps?: (
		props: CalendarEventProps,
	) => Record<string, string | number | boolean | undefined>;
	onClick: (props: CalendarEventProps) => void;
	onMouseEnter?: (props: CalendarEventProps) => void;
	onMouseLeave?: (props: CalendarEventProps) => void;
	onCheckSelected?: (props: CalendarEventProps) => boolean;
	onNextMonth: () => void;
	onPrevMonth: () => void;
}

export interface CalendarGridHeaderCellProps extends PrimitiveProps {
	day: CalendarDate;
	format?: string;
	capitalize?: boolean;
	uppercase?: boolean;
	lowercase?: boolean;
}
