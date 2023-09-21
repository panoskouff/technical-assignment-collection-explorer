<script setup lang="ts">
const props = defineProps<{
  query: string;
  options: string[];
  selected: string;
  selectLabel?: string;
}>();

const emit = defineEmits<{
  (event: 'updateQuery', value: string): void;
  (event: 'clearQuery'): void;
  (event: 'updateSelected', value: string): void;
}>();

const updateQuery = (event: Event) => {
  const newQuery = (event.target as HTMLInputElement).value;
  emit('updateQuery', newQuery);
};

const updateSelected = (event: Event) => {
  const selectedValue = (event.target as HTMLSelectElement).value;
  emit('updateSelected', selectedValue);
};
</script>

<template>
  <div :class="$style.inputContainer">
    <input
      :class="$style.input"
      :value="props.query"
      @input="updateQuery"
      placeholder="your query"
    />
    <button :class="$style.btn" @click="$emit('clearQuery')">clear</button>
    <div :class="$style.selectWrapper">
      <label v-if="props.selectLabel" :class="$style.absLabel">{{
        props.selectLabel
      }}</label>

      <select :class="$style.select" :value="selected" @change="updateSelected">
        <option v-for="option in options" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
    </div>
  </div>
</template>

<style lang="scss" module>
@import '@/styles/mixins.scss';
@import '@/styles/breakpoints.scss';
.relativeContainer {
  position: relative;
}

.absLabel {
  /* we use absolute otherwise the align-items: center; of the
    container will un-align our button because of the label */
  position: absolute;
  top: -14px;
  left: 2px;
  font-size: var(--text-small);
}
.inputContainer {
  display: grid;
  grid-template-columns: 1fr auto auto;
  grid-template-areas: 'input button select';
  gap: var(--gap-standard);
  width: 100%;
  align-items: center;

  @include bp-mx(mobile) {
    grid-template-columns: 1fr auto;
    grid-template-rows: auto auto;
    grid-template-areas:
      'input button'
      'select select';
  }
}

.input {
  grid-area: input;
  @include standard-input;
  padding: 10px;
}

.btn {
  grid-area: button;
  @include standard-input;
  font-size: var(--text-medium);
}

.selectWrapper {
  grid-area: select;
  position: relative;
  @include bp-mx(mobile) {
    margin-top: 16px;
  }
}

.select {
  @include standard-input;
  font-size: var(--text-medium);
  padding: 4px 4px 4px 10px;

  @include bp-mx(mobile) {
    width: 100%;
  }
}
</style>
