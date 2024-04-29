<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import LinkTool from '@editorjs/link';
<<<<<<< HEAD
import edjsHTML from 'editorjs-html';
=======
import Embed from '@editorjs/embed';

>>>>>>> b4a6cf05c1bb990d570cae0ead65b9b66bea9b59

const editor = ref<EditorJS | null>(null);
const editorContent = ref<any>(null);
const edjsParser = edjsHTML(); // Initialize editorjs-html


onMounted(() => {
  editor.value = new EditorJS({
    holder: 'editor',
    tools: {
      header: Header,
      linkTool: {
        class: LinkTool,
        config: {
<<<<<<< HEAD
          endpoint: 'http://localhost:3000',
        }
=======
          endpoint: '',
        }
      },
      embed: {
        class: Embed,
        config: {
          services: {
            youtube: true,
            coub: true
          }
        }
>>>>>>> b4a6cf05c1bb990d570cae0ead65b9b66bea9b59
      }
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
<<<<<<< HEAD
    <br>
    <div id="output-container"></div> <!-- Display HTML output here -->
=======
    <div v-if="editorContent">
      <br>
      <br>
      <pre>{{ editorContent.blocks.map((block: any) => block.data.text).join('\n') }}</pre>
      <hr>
      <pre>{{ editorContent }}</pre>

    </div>

>>>>>>> b4a6cf05c1bb990d570cae0ead65b9b66bea9b59
  </div>
</template>
