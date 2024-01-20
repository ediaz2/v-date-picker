<script setup lang="ts">
	import { Primitive } from 'radix-vue';
	import type {
		CalendarRootEmits,
		CalendarRootProps,
		CalendarEventProps,
	} from '~/types/calendar';
	import { provideCalendarRoot } from '~/providers/calendar';
	import { getLocalTimeZone } from '@internationalized/date';

	const props = withDefaults(defineProps<CalendarRootProps>(), {
		as: 'div',
		timeZone: getLocalTimeZone(),
		locale: 'en-US',
		disabled: false,
		readOnly: false,
	});

	const emit = defineEmits<CalendarRootEmits>();

	const onClick = ({ selected, timeZone, key, day }: CalendarEventProps) => {
		if (selected.size >= 1) selected.clear();
		selected.set(key, day);
		emit('update:selected', day.toDate(timeZone));
	};

	provideCalendarRoot({
		selected: props.selected,
		month: props.month,
		timeZone: props.timeZone,
		locale: props.locale,
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
