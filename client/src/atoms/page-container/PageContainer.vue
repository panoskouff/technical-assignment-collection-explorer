<script setup lang="ts"></script>

<template>
  <div :class="$style.center">
    <div :class="$style.box">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" module>
.center {
  display: flex;
  justify-content: center;
}
.box {
  flex-grow: 1;
  max-width: var(--max-page-width);
  padding: var(--page-offset);
}
</style>
