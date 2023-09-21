<script setup lang="ts">
import { computed } from 'vue';

type Props = {
  x?: string | number;
  y?: string | number;
};

const props = withDefaults(defineProps<Props>(), {
  x: 16,
  y: 16,
});

const appendPx = (value: string | number) => {
  return typeof value === 'number' ? `${value}px` : value;
};

const spaceStyle = computed(() => ({
  width: appendPx(props.x),
  height: appendPx(props.y),
}));
</script>

<template>
  <div :style="spaceStyle"></div>
</template>
