<script setup lang="ts">
	import {
		getWeeksInMonth,
		startOfMonth,
		startOfWeek,
	} from '@internationalized/date';
	import { Primitive, type PrimitiveProps } from 'radix-vue';
	import { computed } from 'vue';
	import { injectCalendarRoot } from '~/providers/calendar';

	withDefaults(defineProps<PrimitiveProps>(), {
		as: 'tbody',
	});

	const { month, locale } = injectCalendarRoot();

	const weeksInMonth = computed(() => {
		return Array.from(
			{ length: getWeeksInMonth(month.value, locale.value) },
			(_, weekIndex) => {
				const monthStart = startOfMonth(month.value).add({
					weeks: weekIndex,
				});
				const weekStart = startOfWeek(monthStart, locale.value);
				return {
					key: weekStart.toString(),
					week: weekStart,
				};
			},
		);
	});
</script>

<template>
	<Primitive :as="as" :as-child="asChild">
		<slot :weeksInMonth="weeksInMonth" :month="month" />
	</Primitive>
</template>
