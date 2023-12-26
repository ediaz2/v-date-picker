<script setup lang="ts">
  import { Primitive, PrimitiveProps } from 'radix-vue';

  withDefaults(defineProps<PrimitiveProps>(), {
    as: 'div',
  });
</script>

<template>
  <Primitive :as="as" :as-child="asChild">
    <slot />
  </Primitive>
</template>
