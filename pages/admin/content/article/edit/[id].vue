<script setup>
definePageMeta({ layout: "admin" });

import { ref, onMounted, nextTick } from "vue";
import AdminHeadingInputHeading from "@/components/admin/heading/input_heading.vue";
import { useRoute } from "vue-router";
import axios from "axios";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import SimpleImage from "@editorjs/simple-image";
import Checklist from "@editorjs/checklist";
import InlineCode from "@editorjs/inline-code";
import CodeTool from "@editorjs/code";
import RawTool from "@editorjs/raw";
import Table from "@editorjs/table";
import NestedList from "@editorjs/nested-list";
import Underline from "@editorjs/underline";
import Quote from "@editorjs/quote";
import Swal from "sweetalert2";

const jsonData = ref(null);
const editorId = ref("editorjs");
const editorInstance = ref(null);

import { fetchSinglePage } from "~/plugins/api/sPageService.js";

const route = useRoute();
const id = route.params.id;

const updatedData = ref({
  title: "",
  status: false,
  day: "",
  tag: [],
  content: [],
});

const contentData = ref(null);

const pageData = ref({
  title: "",
  status: false,
  day: "",
  tag: [],
  content: [],
});

// Fetch page data
const fetchPageData = async () => {
  try {
    const response = await axios.get(`http://localhost:8000/singlepage/${id}`);
    console.log("API response:", response.data);
    const data = response.data.data;
    // Set pageData after fetching
    pageData.value = {
      title: data.title,
      status: data.isActive,
      day: data.createdAt,
      tag: data.tag ? data.tag.map((t) => t.tagName) : [],
      content: data.content ? data.content : [],
    };
    console.log("Page data:", pageData.value);
  } catch (error) {
    console.error("Error fetching page data:", error);
  }
};

// Update single page by ID
const updateSinglePageById = async () => {
  const currentDateTime = new Date().toISOString();
  console.log("Editor instance:", editorInstance.value);
  if (editorInstance.value && editorInstance.value.save) {
    try {
      const editorData = await editorInstance.value.save();
      // Prepare postdata
      const postdata = {
        title: updatedData.value.title,
        isActive: updatedData.value.status,
        content: editorData.blocks,
        tag: updatedData.value.tag.map((tagName) => ({ tagName })),
        updatedAt: currentDateTime,
      };
      // Send data via axios post
      const response = await axios.post(
        `http://localhost:8000/singlepage/${id}`,
        postdata
      );
      console.log("Page update response:", response);
      // Show success message
      Swal.fire({
        icon: "success",
        title: "Page updated successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error updating page:", error);
      // Show error message
      Swal.fire({
        icon: "error",
        title: "Error updating page!",
        text: "Please try again.",
        footer: '<a href="#">Contact us</a>',
      });
    }
  } else {
    console.error("Editor instance is not available or not initialized");
  }
};

const getsave = async () => {
  await updateSinglePageById();
};

const initEditor = async () => {
  if (jsonData.value && jsonData.value.data.typeId === 1) {
    await nextTick(); // Wait for the DOM to update

    editorInstance.value = new EditorJS({
      holder: editorId.value,
      tools: {
        header: Header,
        list: List,
        checklist: Checklist,
        inlineCode: InlineCode,
        code: CodeTool,
        raw: RawTool,
        table: Table,
        nestedList: NestedList,
        underline: Underline,
        quote: Quote,
        image: SimpleImage,
      },
      data: jsonData.value.data.content,
    });

    console.log("Editor instance initialized:", editorInstance.value);
  }
};

onMounted(async () => {
  await fetchPageData();
  jsonData.value = await fetchSinglePage(id);
  await initEditor();
});
</script>

<template>
  <AdminHeadingInputHeading
    :title="pageData.title"
    :status="pageData.status"
    :day="pageData.day"
    :tag="pageData.tag"
    @title="handleSave"
    @status="handleStatus"
    @day="handleDate"
    @tag="handleTag"
    @addTag="handleAddTag"
    @editTag="handleEditTag"
    @removeTag="handleRemoveTag"/>

  <div class="center-container">
    <v-card class="withbg mt-4" style="max-width: 1000px">
      <div class="title-section">
        <v-card-title class="text-h5 ml-3">เพิ่มคำบรรยาย</v-card-title>
      </div>

      <div>
        <template v-if="jsonData">
          <template v-if="jsonData.data.typeId === 1">
            <v-card>
              <div :id="editorId"></div>
              <v-btn color="primary" class="ml-5 mb-6" @click="getsave"
                >บันทึก</v-btn
              >
            </v-card>
          </template>
          <template v-else>
            <p>ข้อมูลไม่ถูกต้อง</p>
          </template>
        </template>
      </div>
    </v-card>
  </div>
</template>
