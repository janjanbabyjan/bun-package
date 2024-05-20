<script setup lang="ts">

definePageMeta({
  layout: "admin",
});


//ดึงมาจาก
import AdminHeadingInputHeading from '@/components/admin/heading/input_heading.vue';

import { ref, onMounted, onBeforeUnmount } from "vue";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import edjsHTML from "editorjs-html";
import List from "@editorjs/list";
import Checklist from "@editorjs/checklist";
import RawTool from "@editorjs/raw";
import Table from "@editorjs/table";
import Underline from "@editorjs/underline";
import Quote from "@editorjs/quote";
import SimpleImage from "@editorjs/simple-image";
import InlineCode from "@editorjs/inline-code";
import CodeTool from "@editorjs/code"; // Import CodeTool
import NestedList from "@editorjs/nested-list";

const editor = ref<EditorJS | null>(null);
const editorContent = ref<any>(null);
const outputEditor = ref<EditorJS | null>(null);


// ตัวบอกหน้า
const breadcrumbs = [
  { text: 'หน้าแรก', href: '/admin' },
  { text: 'รายชื่อหน้าเว็บไซต์', href: '/admin/content/manage-single-page' },
  { text: 'เพิ่มคำบรรยาย', href: '/admin/content/article/add' },
];

const getBreadcrumbText = (index :number) => {
  return breadcrumbs[index].text;
};


const initOutputEditor = () => {
  if (outputEditor.value) {
    outputEditor.value.destroy();
  }

  outputEditor.value = new EditorJS({
    holder: "output-editor",
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
      nestedlist: {
        class: NestedList,
        inlineToolbar: true,
        config: {
          defaultStyle: "ordered", // This is set to 'ordered'
        },
      },
      inlineCode: {
        class: InlineCode,
        shortcut: "CMD+SHIFT+M",
      },
      code: CodeTool, // Add CodeTool to output editor
      raw: RawTool,
      table: {
        class: Table,
        inlineToolbar: true,
      },
      underline: Underline,
      quote: {
        class: Quote,
        inlineToolbar: true,
        shortcut: "CMD+SHIFT+O",
      },
      image: SimpleImage,
      nestedList: {
        class: NestedList,
        inlineToolbar: true,
        config: {
          defaultStyle: 'unordered',
        },
      },
    },
    data: editorContent.value,
    readOnly: true,
  });
};

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
      inlineCode: {
        class: InlineCode,
        shortcut: "CMD+SHIFT+M",
      },
      code: CodeTool, // Add CodeTool to editor
      raw: RawTool,
      table: {
        class: Table,
        inlineToolbar: true,
      },
      nestedlist: {
        class: NestedList,
        inlineToolbar: true,
        config: {
          defaultStyle: "ordered",
        },
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

// น่าจะเกี่ยวกับตัว input คำบรรยาย
onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.destroy();
  }
  if (outputEditor.value) {
    outputEditor.value.destroy();
  }
});


// เพิ่ม code เพื่อดึงลูกมา  -----------------
const saveName = ref('');
const status = ref(true);
const saveDate = ref('');
const inputText = ref('');

const handleSave = (data:any) => {
  console.log("🚀 ~ handleSave ~ data:", data)
  // เก็บข้อมูลที่ได้รับจาก component ตัวลูกเมื่อกดบันทึก
  saveName.value = data;
};

const handleStatus = (data:any) => {
  console.log("🚀 ~ handleSave ~ data:", data)
  // เก็บข้อมูลที่ได้รับจาก component ตัวลูกเมื่อกดบันทึก
  status.value = data;
};

const handleDate = (data:any) => {
  console.log("🚀 ~ handleSave ~ data:", data)
  // เก็บข้อมูลที่ได้รับจาก component ตัวลูกเมื่อกดบันทึก
  saveDate.value = data;
};


const handleTag = (data: any) => {
  console.log("🚀 ~ handleTag ~ data:", data);
  // เก็บข้อมูลที่ได้รับจาก component ตัวลูกเมื่อกดบันทึก
  inputText.value = data;
  // ส่งข้อมูลกลับไปยัง component ตัวแม่ เมื่อข้อมูลเปลี่ยนแปลง
};




const getsave = () => {
  const body ={
    name: saveName.value,
    status: status.value,
    day: saveDate.value,
    tag: inputText.value,
    editorContent: editorContent.value,
  }
  console.log("🚀 ~ getsave ~ body.savedData.value:", saveName.value)
  console.log("🚀 ~ getsave ~ body:", body);

  saveEditorContent();
};



const saveEditorContent = async () => {
  if (editor.value) {
    const savedData = await editor.value.save();
    console.log("🚀 ~ savedData:", savedData)
  }
};

</script>

<template>
  <div>
    <!-- Breadcrumb navigation -->
    <v-breadcrumbs>
      <v-breadcrumbs-item v-for="(breadcrumb, index) in breadcrumbs" :key="index" @click="navigateTo(breadcrumb.href)"
        class="breadcrumb-item">
        {{ getBreadcrumbText(index) }}
        <template v-if="index < breadcrumbs.length - 1"> > </template>
      </v-breadcrumbs-item>
    </v-breadcrumbs>

    <!-- เพิ่มตัวแปลด้วย ถ้าจะดึงจากลูก -->
    <AdminHeadingInputHeading :name="saveName" @name="handleSave" @status="handleStatus" @day="handleDate" @tag="handleTag"  />

    <div class="center-container">
      <v-card class="withbg mt-4 " style="max-width: 1000px;">
        <div class="title-section">
          <v-card-title class="text-h5 ml-3">เพิ่มคำบรรยาย</v-card-title>
        </div>
        <!-- Content area -->
        <div class="editor-wrapper">
          <div id="editor"  class="editor"></div>
        </div>
        <v-btn color="primary" class="ml-5 mb-6" @click="getsave">บันทึก</v-btn>
      </v-card>
    </div>
    
  </div>
</template>

<style scoped>
.breadcrumb-item {
  cursor: pointer;
}

.center-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
