<script setup lang="ts">
  import { Primitive } from 'radix-vue';
  import { CalendarGridHeaderCellProps } from '~/types/calendar';
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
    <slot>
      <div v-bind="buttonProps">
        {{ props.day.day }}
      </div>
    </slot>
  </Primitive>
</template>
~/composables/useCalendarCell