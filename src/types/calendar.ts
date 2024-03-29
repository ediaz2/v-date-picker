import type { CalendarDate } from '@internationalized/date';
import type { PrimitiveProps } from 'radix-vue';
import type { ComputedRef, ShallowReactive, ShallowRef } from 'vue';

export interface CalendarViewProps extends PrimitiveProps {
	offsetMonth?: number;
}

export interface CalendarViewContext {
	offsetMonth: number;
}

export interface CalendarViewInjection {
	offsetMonth: ComputedRef<number>;
}

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
	// isDateUnavailable
	// check
	// showWeekNumbers
}

export type CalendarRootEmits = {
	'update:selected': [value: Date];
	'update:month': [value: Date];
};

export interface CalendarEventProps {
	day: CalendarDate;
	key: string;
}

export interface CalendarRootContext {
	selected: ShallowReactive<Map<string, CalendarDate>>;
	month?: Date;
	timeZone: string;
	locale: string;
	startOfWeek?: number;
	disabled: boolean;
	readOnly: boolean;
	minValue?: Date;
	maxValue?: Date;
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
	minValue: ComputedRef<Date | undefined>;
	maxValue: ComputedRef<Date | undefined>;
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
