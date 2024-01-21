<script setup lang="ts">
	import { Primitive, type PrimitiveProps } from 'radix-vue';
	import { computed } from 'vue';
	import { formatCalendarDate } from '~/utils/formatDate';
	import { injectCalendarRoot } from '~/providers/calendar';
	import { injectCalendarView } from '~/providers/calendarView';

	withDefaults(defineProps<PrimitiveProps>(), {
		as: 'h2',
	});

	const { month, timeZone, locale } = injectCalendarRoot();
	const { offsetMonth } = injectCalendarView();

	const currentMonth = computed(() =>
		month.value.add({ months: offsetMonth.value }),
	);

	const _month = computed(() =>
		formatCalendarDate(
			currentMonth.value,
			'MMMM',
			locale.value,
			timeZone.value,
		),
	);
	const year = computed(() =>
		formatCalendarDate(
			currentMonth.value,
			'YYYY',
			locale.value,
			timeZone.value,
		),
	);
</script>

<template>
	<Primitive :as="as" :as-child="asChild" aria-hidden="true">
		<slot :month="_month" :year="year"> {{ _month }} {{ year }} </slot>
	</Primitive>
</template>
