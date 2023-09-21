<template>
  <div :class="$style.card">
    <div
      :class="$style.gridContainer"
      v-for="(value, key) in props.data"
      :key="key"
    >
      <span :class="$style.bold">{{ key }}:</span>
      <span :class="$style.leftAligned">{{ value }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  data: { id: string } & Record<string, string>;
}>();
</script>

<style lang="scss" module>
@import '@/styles/mixins.scss';
@import '@/styles/breakpoints.scss';
.bold {
  font-weight: var(--text-bold);
}
.card {
  border: var(--border-standard);
  border-radius: var(--border-radius-standard);
  box-shadow: var(--box-shadow-standard);
  padding: 16px;
  margin: 16px 0;
}
.gridContainer {
  display: grid;
  grid-template-columns: 20% auto;
  gap: var(--gap-standard);
  margin-bottom: 5px;

  @include bp-mx(mobile) {
    grid-template-columns: 1fr 1fr;
    gap: var(--gap-small);
  }
}
.leftAligned {
  text-align: left;
}
</style>
