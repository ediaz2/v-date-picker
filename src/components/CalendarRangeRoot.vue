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

	const onClick = ({ selected, key, day, timeZone }: CalendarEventProps) => {
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
			console.log('set');
			selected.set(key, day);
			startDate.value = day;
			return;
		}
	};

	const onMouseEnter = ({ selected, key, day }: CalendarEventProps) => {
		if (endDate.value) return;
		if (selected.size === 1) {
			selected.set(key, day);
		}
	};

	const onMouseLeave = ({ selected, key, timeZone }: CalendarEventProps) => {
		if (endDate.value) return;
		if (!startDate.value) return;
		if (key !== getDay(startDate.value.toDate(timeZone)) && selected.has(key)) {
			selected.delete(key);
		}
	};

	const onCheckSelected = ({
		selected,
		day,
		timeZone,
		key,
	}: CalendarEventProps): boolean => {
		if (selected.size === 0) return false;

		if (startDate.value && key === getDay(startDate.value.toDate(timeZone))) {
			return true;
		}

		const [start, end] = [...selected.values()];

		return isDateInRange({ day, start, end, timeZone });
	};

	const onAdditonalProps = ({
		selected,
		timeZone,
		key,
	}: CalendarEventProps) => {
		if (selected.size === 0) return {};
		if (selected.size === 1 && startDate.value) {
			const value = getDay(startDate.value.toDate(timeZone)) === key;
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
					key === getDay(start.toDate(timeZone)) || undefined,
				'data-selection-end': key === getDay(end.toDate(timeZone)) || undefined,
			};
		}

		return {};
	};

	provideCalendarRoot({
		selected: props.selected,
		month: props.month,
		timeZone: props.timeZone,
		locale: props.locale,
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
</script>

<template>
	<Primitive :as="as" :as-child="asChild">
		<slot />
	</Primitive>
</template>
