<script setup lang="ts">
	import { Primitive } from 'radix-vue';
	import type { CalendarEventProps } from '~/types/calendar';
	import { provideCalendarRoot } from '~/providers/calendar';
	import { getLocalTimeZone } from '@internationalized/date';
	import type {
		CalendarMultipleRootEmits,
		CalendarMultipleRootProps,
	} from '~/types/calendar_multiple';
	import { parseDate, parseDateToMap } from '~/utils/parseDate';
	import { getDay } from '~/utils/getDay';

	const props = withDefaults(defineProps<CalendarMultipleRootProps>(), {
		as: 'div',
		timeZone: getLocalTimeZone(),
		locale: 'en-US',
		disabled: false,
		readOnly: false,
	});

	const emit = defineEmits<CalendarMultipleRootEmits>();
	const locale = props.locale;
	const selected = parseDateToMap(locale, props.selected);
	const timeZone = props.timeZone;

	const onClick = ({ key, day }: CalendarEventProps) => {
		if (selected.has(key)) {
			selected.delete(key);
		} else {
			selected.set(key, day);
		}

		emit(
			'update:selected',
			[...selected.values()].map((date) => date.toDate(timeZone)),
		);
	};

	provideCalendarRoot({
		selected: selected,
		month: props.month,
		timeZone,
		locale,
		startOfWeek: props.startOfWeek,
		disabled: props.disabled,
		readOnly: props.readOnly,
		onClick,
		onUpdatedMonth: (value) => emit('update:month', value),
	});

	defineExpose({
		onSelect: (value: Date[]) => {
			selected.clear();
			value.forEach((date) => {
				onClick({
					key: getDay(date, locale),
					day: parseDate(date, locale),
				});
			});
		},
	});
</script>

<template>
	<Primitive :as="as" :as-child="asChild">
		<slot />
	</Primitive>
</template>
