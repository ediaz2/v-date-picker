<script setup lang="ts">
  import { Primitive } from 'radix-vue';
  import { computed } from 'vue';
  import { formatCalendarDate } from '~/utils/formatDate';
  import type { CalendarGridHeaderCellProps } from '~/types/calendar';
  import { injectCalendarRoot } from '~/providers/calendar';

  const props = withDefaults(defineProps<CalendarGridHeaderCellProps>(), {
    as: 'th',
    format: 'E',
  });

  const { locale, timeZone } = injectCalendarRoot();

  const day = computed(() =>
    formatCalendarDate(props.day, props.format, locale.value, timeZone.value),
  );
</script>

<template>
  <Primitive :as="as" :as-child="asChild">
    <slot>
      {{ day }}
    </slot>
  </Primitive>
</template>
