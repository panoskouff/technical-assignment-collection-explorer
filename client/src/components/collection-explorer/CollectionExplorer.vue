<script setup lang="ts">
import { ref, watch, Ref } from 'vue';
import { CollectionData } from '@/types';
import { Space } from '@/atoms';
import Search from '@/components/search/Search.vue';
import Card from '@/components/card/Card.vue';
import { debounce, searchInCollection } from '@/utils';

type SearchResults = { id: string } & Record<string, string>;

const props = withDefaults(
  defineProps<{
    collection: CollectionData[];
    defaultSelectedKey?: keyof CollectionData;
  }>(),
  {
    /* All collections must have 'id' as a common key, this is
      a requirement so we can use 'id' as the default.  */
    defaultSelectedKey: 'id',
  }
);

const selectedKey = ref<string>(props.defaultSelectedKey);
const searchQuery = ref('');
const searchResults: Ref<SearchResults[]> = ref([]);
const debounceTime = ref(0);
let collectionKeys: string[] = Object.keys(props.collection?.[0] || {});

const performSearchImplementation = () => {
  searchResults.value = searchInCollection(
    searchQuery.value,
    props.collection,
    selectedKey.value
  );
};

// perform an initial search on startup to show results
performSearchImplementation();

// initialize performSearch function with debounce
let performSearch = debounce(performSearchImplementation, debounceTime.value);

watch(debounceTime, (newTime) => {
  /* bound new debounce time to performSearch function */
  performSearch = debounce(performSearchImplementation, newTime);
});

const updateSelectedKey = (option: string) => {
  selectedKey.value = option;

  /* perform a search whenever the search key changes */
  performSearch();
};

const updateSearchQuery = (newQuery: string) => {
  searchQuery.value = newQuery;

  /* perform a search whenever the search query changes */
  performSearch();
};

const clearSearchQuery = () => {
  searchQuery.value = '';

  /* perform a search whenever we clear the query to show all results */
  performSearch();
};
</script>

<template>
  <Space :y="24" />
  <Search
    :query="searchQuery"
    :options="collectionKeys"
    :selected="selectedKey"
    selectLabel="Search for key:"
    @updateQuery="updateSearchQuery"
    @clearQuery="clearSearchQuery"
    @updateSelected="updateSelectedKey"
  />
  <Space :y="24" />
  <div :class="$style.debounceIndicatorContainer">
    <label :class="$style.debounceIndicatorLabel">debounce time in ms:</label>
    <input
      :class="$style.debounceInput"
      type="number"
      v-model.number="debounceTime"
      min="0"
    />
  </div>
  <Space :y="24" />
  <div>
    <div v-if="searchResults?.length === 0">no data</div>
    <div v-else>
      <div v-for="item in searchResults" :key="item.id">
        <Card :data="item" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
@import '@/styles/mixins.scss';
@import '@/styles/breakpoints.scss';
.debounceIndicatorContainer {
  display: flex;
  align-items: center;

  @include bp-mx(mobile) {
    width: 100%;
  }
}

.debounceIndicatorLabel {
  @include bp-mx(mobile) {
    width: 60%;
  }
}

.debounceInput {
  @include standard-input;
  margin-left: 16px;
  width: 80px;

  @include bp-mx(mobile) {
    width: 40%;
  }
}
</style>
