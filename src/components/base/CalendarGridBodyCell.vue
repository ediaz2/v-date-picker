<script setup lang="ts">
  import { Primitive } from 'radix-vue';
  import type { CalendarGridHeaderCellProps } from '~/types/calendar';
  import { useCalendarCell } from '~/composables/useCalendarCell';

  const props = withDefaults(defineProps<CalendarGridHeaderCellProps>(), {
    as: 'td',
    format: 'E',
    isSelectable: true,
  });

  const { buttonProps, cellProps } = useCalendarCell(props);
</script>

<template>
  <Primitive :as="as" :as-child="asChild" v-bind="cellProps">
    <div v-bind="buttonProps">
      <slot>
        {{ props.day.day }}
      </slot>
    </div>
  </Primitive>
</template>
