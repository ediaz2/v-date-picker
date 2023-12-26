<script setup lang="ts">
  import { Primitive, type PrimitiveProps } from 'radix-vue';
  import { computed } from 'vue';
  import { weekDays as _weekDays } from '~/utils/weekDays';
  import { injectCalendarRoot } from '~/providers/calendar';

  withDefaults(defineProps<PrimitiveProps>(), {
    as: 'thead',
  });

  const { month, locale } = injectCalendarRoot();

  const weekDays = computed(() => _weekDays(month.value, locale.value));
</script>

<template>
  <Primitive :as="as" :as-child="asChild">
    <slot :weekDays="weekDays" />
  </Primitive>
</template>
