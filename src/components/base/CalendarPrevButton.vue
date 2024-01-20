<script setup lang="ts">
	import { Primitive, type PrimitiveProps } from 'radix-vue';
	import { injectCalendarRoot } from '~/providers/calendar';

	const props = withDefaults(defineProps<PrimitiveProps>(), {
		as: 'button',
	});

	const { onPrevMonth, disabled } = injectCalendarRoot();
</script>

<template>
	<Primitive
		v-bind="props"
		:disabled="disabled"
		aria-label="Prev Month"
		:type="as === 'button' ? 'button' : undefined"
		@click.stop="onPrevMonth">
		<slot>Prev month</slot>
	</Primitive>
</template>
