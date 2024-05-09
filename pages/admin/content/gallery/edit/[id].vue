<script setup>
definePageMeta({
  layout: "admin",
});

import { format } from 'date-fns'

const date = ref(new Date())
</script>

<template>
    <div> Hello Index Content Edit Article</div>

    <UPopover :popper="{ placement: 'bottom-start' }">
    <UButton icon="i-heroicons-calendar-days-20-solid" :label="format(date, 'd MMM, yyy')" />

    <template #panel="{ close }">
      <DatePicker v-model="date" is-required @close="close" />
    </template>
  </UPopover>

</template>




