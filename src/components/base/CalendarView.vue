<script setup lang="ts">
	import { Primitive } from 'radix-vue';
	import { providerCalendarView } from '~/providers/calendarView';
	import type { CalendarViewProps } from '~/types/calendar';

	const props = withDefaults(defineProps<CalendarViewProps>(), {
		as: 'div',
		offsetMonth: 0,
	});

	providerCalendarView({
		offsetMonth: props.offsetMonth,
	});
</script>

<template>
	<Primitive :as="as" :as-child="asChild">
		<slot />
	</Primitive>
</template>
