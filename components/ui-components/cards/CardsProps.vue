<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import LinkTool from '@editorjs/link';


const editor = ref<EditorJS | null>(null);
const editorContent = ref<any>(null);

onMounted(() => {
  editor.value = new EditorJS({
    holder: 'editor',
    tools: {
      header: Header,
      link: Link,
    },
  });
});

onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.destroy();
  }
});

const getContent = () => {
  if (editor.value) {
    editor.value.save().then((outputData: any) => {
      editorContent.value = outputData;
    });
  }
};
</script>

<template>
  <div>
    <v-card elevation="0" title="This is a title" subtitle="This is a subtitle" text="This is content">
      <div id="editor" class="editor" style="padding: 1rem;"></div>
    </v-card>
    <v-btn @click="getContent">Show Output</v-btn>
    <div v-if="editorContent">
      <pre>{{ editorContent }}</pre>
    </div>
    <div>
      <!-- {{ editorContent.blocks.data.text }} -->
    </div>
  </div>
</template>