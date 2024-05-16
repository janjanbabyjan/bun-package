<!-- <script setup lang="ts">
import { Blog } from '@/data/dashboard/dashboardData';
import { useRoute } from 'vue-router';

const route = useRoute();
const contentId = +route.params.id;

const content = Blog.find((item) => item.id === contentId);

</script>

<template>
  <div class="d-flex flex-column gap-1 mx-1 pt-4  ">
    <div class="mb-6">
      <v-card elevation="10" v-if="content">
        <div class="py-10 px-10">
          <h2>{{ content.title }}</h2>
          {{ content.date }}
        </div>

        <div class="py-6 px-4 pt-0 d-flex justify-center">
          <img :src="content.img" :alt="content.title" />
        </div>
        <div class="py-10 px-10 text-justify">
          <p> {{ content.desc }}</p>

        </div>
        <div class="py-10 px-10 text-justify">
          <v-chip color="primary" height="auto" size="small" variant="tonal" rounded="md">{{
            content.badge
          }}</v-chip>
        </div>
      </v-card>
      <v-card v-else>
        <p>Content not found.</p>
      </v-card>
    </div>
  </div>

</template>



<style>
img {
  width: 700px;
}

.v-footer {
  width: 100%;
}
</style> -->



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

onMounted(async () => {
  const id = route.params.id;
  const jsonData = await fetchSinglePage(id);

  if (jsonData && jsonData.data && jsonData.data.content) {
    contentData.value = JSON.stringify(jsonData.data.content);

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
      data: jsonData.data.content,
    });
  } else {
    console.error('Data not found');
  }
});
</script>

<template>
  <v-card>
    <div :id="editorId"></div>
  </v-card>
</template>