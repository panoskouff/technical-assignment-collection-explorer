<script setup lang="ts">
import PageContainer from '@/atoms/page-container/PageContainer.vue';
import Space from '@/atoms/Space.vue';
import useWatchRequest from '@/composables/useWatchRequest';
import { adapters, getCustomers } from '@/queries';
import CollectionExplorer from '@/components/collection-explorer/CollectionExplorer.vue';

const collection = useWatchRequest(getCustomers, {
  adapter: adapters.adaptCustomers,
  immediate: true,
});

</script>
<template>
  <PageContainer>
    <Space :y="24" />
    <div v-if="collection.loading">loading data..</div>
    <div v-else-if="collection.hasError">
      {{ collection.errorMessage }}
    </div>
    <div v-else-if="collection.called && collection.adaptedData === null">
      {{ 'something went wrong :(' }}
    </div>
    <div v-else>
      <Space :y="24" />
      <CollectionExplorer
        :collection="collection.adaptedData ?? []"
        defaultSelectedKey="fullName"
      />
    </div>
  </PageContainer>
</template>
