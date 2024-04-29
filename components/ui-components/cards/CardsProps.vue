<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
// import LinkTool from '@editorjs/link';
import edjsHTML from "editorjs-html";
import List from "@editorjs/list";
import Checklist from "@editorjs/checklist";
import RawTool from "@editorjs/raw";
import Table from "@editorjs/table";
import Underline from "@editorjs/underline";
import Quote from "@editorjs/quote";
import SimpleImage from "@editorjs/simple-image";
const editor = ref<EditorJS | null>(null);
const editorContent = ref<any>(null);
const edjsParser = edjsHTML(); // Initialize editorjs-html
import Embed from '@editorjs/embed';

onMounted(() => {
  editor.value = new EditorJS({
    holder: "editor",
    tools: {
      header: Header,
      list: {
        class: List,
        inlineToolbar: true,
        config: {
          defaultStyle: "unordered",
        },
      },
      checklist: {
        class: Checklist,
        inlineToolbar: true,
      },
      raw: RawTool,
      table: {
        class: Table,
        inlineToolbar: true,
      },
      embed: {
      class: Embed,
      config: {
        services: {
          youtube: true,
          coub: true
        }
      }
    },
      underline: Underline,
      quote: {
        class: Quote,
        inlineToolbar: true,
        shortcut: "CMD+SHIFT+O",
      },
      image: SimpleImage,
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
      const htmlContent: string = edjsParser.parse(outputData).join("");
      displayHTML(htmlContent);
    });
  }
};

const displayHTML = (html: any) => {
  const outputContainer = document.getElementById("output-container");
  if (outputContainer) {
    outputContainer.innerHTML = html;
  }
};
</script>

<template>
  <div>
    <v-card elevation="0">
      <div id="editor" class="editor" style="padding: 1rem"></div>
    </v-card>
    <v-btn @click="getContent">Show Output</v-btn>
    <br />
    <div id="output-container"></div>
    <!-- Display HTML output here -->
  </div>
</template>
