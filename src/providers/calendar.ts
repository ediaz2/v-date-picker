import {
	type CalendarDate,
	parseDate,
	today,
	startOfMonth,
} from '@internationalized/date';
import type { InjectionKey } from 'vue';
import { computed, inject, provide, shallowRef } from 'vue';
import type {
	CalendarRootContext,
	CalendarRootInjection,
} from '~/types/calendar';
import { parseDateToMap } from '~/utils/parseDate';

export const CalendarRoot = Symbol(
	'CalendarRoot',
) as InjectionKey<CalendarRootInjection>;

export const provideCalendarRoot = ({
	selected,
	month,
	timeZone,
	locale,
	disabled,
	readOnly,
	startOfWeek,
	onAdditonalProps,
	onClick,
	onMouseEnter,
	onMouseLeave,
	onCheckSelected,
	onUpdatedMonth,
}: CalendarRootContext) => {
	const _timeZone = computed(() => timeZone);
	const _month = shallowRef<CalendarDate>(
		startOfMonth(
			month ? parseDate(month.toISOString()) : today(_timeZone.value),
		),
	);

	if (!month) {
		onUpdatedMonth(_month.value.toDate(_timeZone.value));
	}

	provide(CalendarRoot, {
		month: _month,
		selected: parseDateToMap(selected),
		today: today(_timeZone.value),
		timeZone: _timeZone,
		locale: computed(() => locale),
		startOfWeek: computed(() => startOfWeek),
		disabled: computed(() => disabled),
		readOnly: computed(() => readOnly),
		onAdditonalProps,
		onClick,
		onMouseEnter,
		onMouseLeave,
		onCheckSelected,
		onNextMonth: () => {
			_month.value = _month.value.add({ months: 1 });
			onUpdatedMonth(startOfMonth(_month.value).toDate(_timeZone.value));
		},
		onPrevMonth: () => {
			_month.value = _month.value.subtract({ months: 1 });
			onUpdatedMonth(startOfMonth(_month.value).toDate(_timeZone.value));
		},
	});
};

export const injectCalendarRoot = () => {
	const context = inject(CalendarRoot);

	if (!context) {
		throw new Error('CalendarRoot context not provided');
	}

	return context;
};
