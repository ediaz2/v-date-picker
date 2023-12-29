<script setup lang="ts">
  import { Primitive, type PrimitiveProps } from 'radix-vue';
  import { injectCalendarRoot } from '~/providers/calendar';

  const props = withDefaults(defineProps<PrimitiveProps>(), {
    as: 'button',
  });

  const { onNextMonth, disabled } = injectCalendarRoot();
</script>

<template>
  <Primitive
    v-bind="props"
    :disabled="disabled"
    aria-label="Next Month"
    :type="as === 'button' ? 'button' : undefined"
    @click.stop="onNextMonth">
    <slot>Next month</slot>
  </Primitive>
</template>
