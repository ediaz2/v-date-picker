<script setup lang="ts">
	import {
		type CalendarDate,
		endOfMonth as endOfMonthFn,
		startOfMonth as startOfMonthFn,
	} from '@internationalized/date';
	import { Primitive, type PrimitiveProps } from 'radix-vue';
	import { computed } from 'vue';
	import { injectCalendarRoot } from '~/providers/calendar';

	import { getStartOfWeek } from '~/utils/getStartOfWeek';

	withDefaults(defineProps<PrimitiveProps>(), {
		as: 'tbody',
	});

	const { month, locale, startOfWeek } = injectCalendarRoot();

	const startOfMonth = computed(() =>
		getStartOfWeek(
			startOfMonthFn(month.value),
			locale.value,
			startOfWeek.value,
		),
	);
	const endOfMonth = computed(() =>
		getStartOfWeek(endOfMonthFn(month.value), locale.value, startOfWeek.value),
	);

	const weeksInMonth = computed(() => {
		const weeks = [];
		let week = startOfMonth.value;
		while (week <= endOfMonth.value) {
			const weekStart = week;
			const days = [...new Array(7).keys()].map((index) => {
				return {
					keyDay: `day-${index.toString()}`,
					day: weekStart.add({ days: index }) as CalendarDate,
				};
			});
			weeks.push({
				keyWeek: `week-${week.toString()}`,
				week: days,
			});
			week = week.add({ weeks: 1 });
		}
		return weeks;
	});
</script>

<template>
	<Primitive :as="as" :as-child="asChild">
		<slot :weeksInMonth="weeksInMonth" />
	</Primitive>
</template>
