<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import EditorJS from '@editorjs/editorjs';

const editor = ref<EditorJS | null>(null);

onMounted(() => {
  editor.value = new EditorJS({
    holder: 'editor',
  });
});

onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.destroy();
  }
});
</script>

<template>
  <div>
    <v-card elevation="0" title="This is a title" subtitle="This is a subtitle" text="This is content">
      <div id="editor" class="editor"></div>
    </v-card>
  </div>
</template>
