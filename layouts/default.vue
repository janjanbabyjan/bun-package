<!-- <script setup lang="ts">
import { ref, onMounted } from "vue";
const title = ref("spikeadmin Nuxt 3 - Vuetify 3 - vite - Typescript Based Free Dashboard");
useHead({
  meta: [{ content: title }],
  titleTemplate: (titleChunk) => {
    return titleChunk
      ? `${titleChunk} - Nuxt3 Typescript based Free Admin Dashboard Template`
      : "spikeadmin Nuxt 3 - Vuetify 3 - vite - Typescript Based Free Dashboard";
  },
});
</script> -->

<template>
    <slot></slot>
  
</template>
