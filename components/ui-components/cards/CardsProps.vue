<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import LinkTool from '@editorjs/link';
import edjsHTML from 'editorjs-html';
<<<<<<< HEAD
=======
import List from '@editorjs/list';
>>>>>>> 7dbcc70a9cb5f0ac9331694124f7ce8017f9721f

const editor = ref<EditorJS | null>(null);
const editorContent = ref<any>(null);
const edjsParser = edjsHTML(); // Initialize editorjs-html

onMounted(() => {
  editor.value = new EditorJS({
    holder: 'editor',
    tools: {
      header: Header,
      list: {
        class: List,
        inlineToolbar: true,
        config: {
          defaultStyle: 'unordered'
        }
      },
      linkTool: {
        class: LinkTool,
        config: {
<<<<<<< HEAD
          endpoint: 'http://localhost:3000',
        }
      }
=======
          endpoint: '',
        }
      },

>>>>>>> 7dbcc70a9cb5f0ac9331694124f7ce8017f9721f
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
      editorContent.value = outputData; // Save JSON data
      const htmlContent: string = edjsParser.parse(outputData).join('');
      displayHTML(htmlContent);
    });
  }
};

const displayHTML = (html: string) => {
  const outputContainer = document.getElementById('output-container');
  if (outputContainer) {
    outputContainer.innerHTML = html;
  }
};
</script>

<template>
  <div>
    <v-card elevation="0">
      <div id="editor" class="editor" style="padding: 1rem;"></div>
    </v-card>
    <v-btn @click="getContent">Show Output</v-btn>
    <br>
    <div id="output-container"></div> <!-- Display HTML output here -->
  </div>
</template>
