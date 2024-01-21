import type { InjectionKey } from 'vue';
import { computed, inject, provide } from 'vue';
import type {
	CalendarViewContext,
	CalendarViewInjection,
} from '~/types/calendar';

export const CalendarView = Symbol(
	'CalendarView',
) as InjectionKey<CalendarViewInjection>;

export const providerCalendarView = ({ offsetMonth }: CalendarViewContext) => {
	provide(CalendarView, {
		offsetMonth: computed(() => offsetMonth),
	});
};

export const injectCalendarView = () => {
	const context = inject(CalendarView);

	if (!context) {
		throw new Error('CalendarView context not provided');
	}

	return context;
};
