<script setup lang="ts">
	import { Primitive } from 'radix-vue';
	import type { CalendarEventProps } from '~/types/calendar';
	import { provideCalendarRoot } from '~/providers/calendar';
	import { getLocalTimeZone } from '@internationalized/date';
	import type {
		CalendarMultipleRootEmits,
		CalendarMultipleRootProps,
	} from '~/types/calendar_multiple';

	const props = withDefaults(defineProps<CalendarMultipleRootProps>(), {
		as: 'div',
		timeZone: getLocalTimeZone(),
		locale: 'en-US',
		disabled: false,
		readOnly: false,
	});

	const emit = defineEmits<CalendarMultipleRootEmits>();

	const onClick = ({ selected, key, day, timeZone }: CalendarEventProps) => {
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
		selected: props.selected,
		month: props.month,
		timeZone: props.timeZone,
		locale: props.locale,
		startOfWeek: props.startOfWeek,
		disabled: props.disabled,
		readOnly: props.readOnly,
		onClick,
		onUpdatedMonth: (value) => emit('update:month', value),
	});
</script>

<template>
	<Primitive :as="as" :as-child="asChild">
		<slot />
	</Primitive>
</template>
