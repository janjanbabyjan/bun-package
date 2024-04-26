<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import EditorJS from '@editorjs/editorjs';

const editor = ref<EditorJS | null>(null);
const editorContent = ref<any>(null); // Use appropriate type for the content

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

const getContent = () => {
  if (editor.value) {
    editor.value.save().then((outputData: any) => {
      editorContent.value = outputData;
    })
  }
}

</script>

<template>
  <div>
    <v-card elevation="0" title="This is a title" subtitle="This is a subtitle" text="This is content">
      <div id="editor" class="editor"></div>
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
