<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Checklist from "@editorjs/checklist";
import RawTool from "@editorjs/raw";
import Table from "@editorjs/table";
import Underline from "@editorjs/underline";
import Quote from "@editorjs/quote";
import SimpleImage from "@editorjs/simple-image";
import InlineCode from "@editorjs/inline-code";
import CodeTool from "@editorjs/code";
import NestedList from "@editorjs/nested-list";
import { fetchSinglePage } from '~/plugins/api/sPageService.js';

const editorId = ref('editorjs');
const contentData = ref(null);
const route = useRoute();
const jsonData = ref(null);
const editorOutput = ref('');

const selectedImageUrl = ref('');
const showImageModal = ref(false);
const zoom = ref(1);

const baseUrl = 'http://localhost:8000';

const getImageUrl = (imagePath) => {
  const fullUrl = `${baseUrl}${imagePath}`;
  console.log('Full Image URL:', fullUrl);
  return fullUrl;
};

const handleWheel = (e) => {
  const delta = e.deltaY < 0 ? 0.1 : -0.1;
  zoom.value = Math.max(0.5, Math.min(2, zoom.value + delta));
};

const zoomIn = () => {
  zoom.value = Math.min(2, zoom.value + 0.1);
};

const zoomOut = () => {
  zoom.value = Math.max(0.5, zoom.value - 0.1);
};

onMounted(async () => {
  const id = route.params.id;
  jsonData.value = await fetchSinglePage(id);

  if (jsonData.value && jsonData.value.data.typeId === 1) {
    contentData.value = JSON.stringify(jsonData.value.data.content);

    const editor = new EditorJS({
      holder: editorId.value,
      readOnly: true,
      tools: {
        header: Header,
        list: {
          class: List,
          inlineToolbar: true,
          config: {
            defaultStyle: "unordered",
          },
        },
        checklist: Checklist,
        nestedlist: NestedList,
        inlineCode: InlineCode,
        code: CodeTool,
        raw: RawTool,
        table: Table,
        underline: Underline,
        quote: Quote,
        image: SimpleImage,
        nestedList: NestedList,
      },
      data: jsonData.value.data.content,
    });

    editor.isReady.then(() => {
      const outputData = editor.saver.getEditorData();
      editorOutput.value = JSON.stringify(outputData, null, 2);
    });
  }
});
</script>


<template>
  <div>
    <template v-if="jsonData">
      <template v-if="jsonData.data.typeId === 1">
        <v-card>
          <div :id="editorId"></div>
          <pre>{{ editorOutput }}</pre>
        </v-card>
      </template>
      <template v-else>
        <div class="py-md-15 py-8 gallery">
          <v-container>
            <v-row class="justify-center">
              <v-col cols="12" sm="8">
                <div class="text-center">
                  <h2 class="text-h2 text-dark mb-3">Gallery</h2>
                </div>
              </v-col>
            </v-row>
            <v-row class="justify-center">
              <v-col cols="12" md="4" sm="6" v-for="(imagePath, index) in jsonData.data.content" :key="index" class="mb-2">
                <div class="hover-card overflow-hidden">
                  <v-img :src="getImageUrl(imagePath)" height="250px" alt="Uploaded Image" cover class="w-100"
                    @click="showImageModal = true; selectedImageUrl = getImageUrl(imagePath)"></v-img>
                </div>
              </v-col>
            </v-row>
          </v-container>

          <v-dialog v-model="showImageModal" max-width="800" max-height="1000">
            <v-container>
              <div class="image-container">
                <img :src="selectedImageUrl" :style="{
                  transform: `scale(${zoom})`,
                  transformOrigin: 'center',
                }" @wheel.prevent="handleWheel" />
              </div>
              <v-card-actions>
                <v-btn icon @click="zoomOut">
                  <v-icon>mdi-magnify-minus-outline</v-icon>
                </v-btn>
                <v-btn icon @click="zoomIn">
                  <v-icon>mdi-magnify-plus-outline</v-icon>
                </v-btn>
              </v-card-actions>
            </v-container>
          </v-dialog>
        </div>      </template>
    </template>
  </div>
</template>

<style scoped>
.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.image-container img {
  max-width: 100%;
  max-height: 100%;
  transition: transform .3s ease-in-out;
}

.image-container img:hover {
  transform: scale(1.2);
}

.v-icon {
  color: #ffffff;
}

.v-dialog .v-container .v-card-actions {
  justify-content: center;
  align-items: center;
}
</style>
