<script setup lang="ts">
	import { Primitive } from 'radix-vue';
	import type { CalendarEventProps } from '~/types/calendar';
	import { provideCalendarRoot } from '~/providers/calendar';
	import { type CalendarDate, getLocalTimeZone } from '@internationalized/date';
	import type {
		CalendarRangeRootEmits,
		CalendarRangeRootProps,
	} from '~/types/calendar_range';
	import { isDateInRange } from '~/utils/isDateInRange';
	import { ref } from 'vue';
	import { getDay } from '~/utils/getDay';
	import { parseDate, parseDateToMap } from '~/utils/parseDate';

	const props = withDefaults(defineProps<CalendarRangeRootProps>(), {
		as: 'div',
		timeZone: getLocalTimeZone(),
		locale: 'en-US',
		disabled: false,
		readOnly: false,
	});

	const emit = defineEmits<CalendarRangeRootEmits>();
	const startDate = ref<CalendarDate | null>(null);
	const endDate = ref<CalendarDate | null>(null);
	const locale = props.locale;
	const selected = parseDateToMap(locale, props.selected);
	const timeZone = props.timeZone;

	const onClick = ({ key, day }: CalendarEventProps) => {
		if (selected.size > 0) {
			if (!endDate.value) {
				selected.set(key, day);
				endDate.value = day;
				if (startDate.value && endDate.value) {
					const [start, end] = [startDate.value, endDate.value]
						.sort(
							(a, b) =>
								a.toDate(timeZone).getTime() - b.toDate(timeZone).getTime(),
						)
						.map((date) => date.toDate(timeZone));

					emit('update:selected', [start, end]);
				}
			} else {
				selected.clear();
				selected.set(key, day);
				startDate.value = day;
				endDate.value = null;
			}

			return;
		}

		if (selected.size === 0) {
			selected.set(key, day);
			startDate.value = day;
			return;
		}
	};

	const onMouseEnter = ({ key, day }: CalendarEventProps) => {
		if (endDate.value) return;
		if (selected.size === 1) {
			selected.set(key, day);
		}
	};

	const onMouseLeave = ({ key }: CalendarEventProps) => {
		if (endDate.value) return;
		if (!startDate.value) return;
		if (
			key !== getDay(startDate.value.toDate(timeZone), locale) &&
			selected.has(key)
		) {
			selected.delete(key);
		}
	};

	const onCheckSelected = ({ day, key }: CalendarEventProps): boolean => {
		if (selected.size === 0) return false;

		if (
			startDate.value &&
			key === getDay(startDate.value.toDate(timeZone), locale)
		) {
			return true;
		}

		const [start, end] = [...selected.values()];

		return isDateInRange({ day, start, end, timeZone });
	};

	const onAdditonalProps = ({ key }: CalendarEventProps) => {
		if (selected.size === 0) return {};
		if (selected.size === 1 && startDate.value) {
			const value = getDay(startDate.value.toDate(timeZone), locale) === key;
			return {
				'data-selection-start': value || undefined,
				'data-selection-end': value || undefined,
			};
		}

		if (selected.size === 2) {
			const [start, end] = [...selected.values()].sort(
				(a, b) => a.toDate(timeZone).getTime() - b.toDate(timeZone).getTime(),
			);

			return {
				'data-selection-start':
					key === getDay(start.toDate(timeZone), locale) || undefined,
				'data-selection-end':
					key === getDay(end.toDate(timeZone), locale) || undefined,
			};
		}

		return {};
	};

	provideCalendarRoot({
		selected,
		month: props.month,
		timeZone,
		locale,
		startOfWeek: props.startOfWeek,
		disabled: props.disabled,
		readOnly: props.readOnly,
		minValue: props.minValue,
		maxValue: props.maxValue,
		onAdditonalProps,
		onClick,
		onMouseEnter,
		onMouseLeave,
		onCheckSelected,
		onUpdatedMonth: (value) => emit('update:month', value),
	});

	defineExpose({
		onSelect: (value: [Date, Date]) => {
			selected.clear();
			startDate.value = null;
			endDate.value = null;
			value.forEach((date) => {
				selected.set(getDay(date, locale), parseDate(date, locale));
			});

			emit('update:selected', value);
		},
	});
</script>

<template>
	<Primitive :as="as" :as-child="asChild">
		<slot />
	</Primitive>
</template>
