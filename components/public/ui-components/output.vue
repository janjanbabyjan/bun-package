<template>
  <div>
    <h2>Output:</h2>
    <div v-html="content"></div>
  </div>
</template>

<script setup>
defineProps({
  content: {
    type: Object,
    required: true,
  },
});
</script>