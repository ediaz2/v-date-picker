<script setup lang="ts">
	import { Primitive } from 'radix-vue';
	import type {
		CalendarRootEmits,
		CalendarRootProps,
		CalendarEventProps,
	} from '~/types/calendar';
	import { provideCalendarRoot } from '~/providers/calendar';
	import { parseDate, parseDateToMap } from '~/utils/parseDate';
	import { getDay } from '~/utils/getDay';
	import { getLocalTimeZone } from '~/utils/getLocalTimeZone';

	const props = withDefaults(defineProps<CalendarRootProps>(), {
		as: 'div',
		timeZone: getLocalTimeZone(),
		locale: 'en-US',
		disabled: false,
		readOnly: false,
		startOfWeek: 0,
	});

	const emit = defineEmits<CalendarRootEmits>();
	const locale = props.locale;
	const selected = parseDateToMap(locale, props.selected);
	const timeZone = props.timeZone;

	const onClick = ({ key, day }: CalendarEventProps) => {
		if (selected.size >= 1) selected.clear();
		selected.set(key, day);
		emit('update:selected', day.toDate(timeZone));
	};

	provideCalendarRoot({
		selected,
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
		onSelect: (value: Date) => {
			onClick({
				key: getDay(value, locale),
				day: parseDate(value, locale),
			});
		},
	});
</script>

<template>
	<Primitive :as="as" :as-child="asChild">
		<slot />
	</Primitive>
</template>
