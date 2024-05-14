<script setup lang="ts">

definePageMeta({
  layout: "admin",
});

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


// ปุ่มบันทึก
const getsave = () => {
  if (editor.value) {
    editor.value.save().then((outputData: any) => {
      editorContent.value = outputData;
      initOutputEditor();
    });
  }
};


// ตัวบอกหน้า
const breadcrumbs = [
  { text: 'หน้าแรก', href: '/admin' },
  { text: 'รายชื่อหน้าเว็บไซต์', href: '/admin/content/manage-single-page' },
  { text: 'เพิ่มคำบรรยาย', href: '/admin/content/article/add' },
];

const getBreadcrumbText = (index: number) => {
  return breadcrumbs[index].text;
};

// ปุ่มเปิดปิด
const isOpen = ref(false); // เริ่มต้นเปิดให้เป็น false

// วันที่
const dialog = ref(false); // ตัวแปรสำหรับการเปิดปิด dialog
const selectedDate = ref(null); // ตัวแปรสำหรับเก็บวันที่ที่เลือก

const openDialog = () => {
  dialog.value = true; // เปิด dialog เมื่อกดปุ่ม
};

const saveDate = () => {
  // บันทึกวันที่ที่เลือกไว้ใน selectedDate
  selectedDate.value = selectedDate.value;
  // ปิด dialog เมื่อกดปุ่ม "บันทึก"
  dialog.value = false;
};

const closeDialog = () => {
  // ปิด dialog เมื่อกดปุ่ม "ยกเลิก"
  dialog.value = false;
};

// ประกาศ ref สำหรับเก็บข้อความที่ผู้ใช้ป้อน
const inputText = ref<string>('');

// ประกาศ ref สำหรับเก็บ Tag ที่เพิ่มขึ้นมา
const tags = ref<string[]>([]);

const addTag = () => {
  if (inputText.value.trim() !== '') {
    tags.value.push(inputText.value.trim());
    inputText.value = '';
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

    <AdminHeadingInputHeading/>
    
    <AdminHeadingTaginput/>

    

    <div class="center-container">
      <v-card class="withbg mt-4 " style="max-width: 1000px;">
        <div class="title-section">
          <v-card-title class="text-h5 ml-3">เพิ่มคำบรรยาย</v-card-title>
        </div>
        <!-- Content area -->
        <div class="editor-wrapper">
          <div id="editor" class="editor"></div>
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

.description {
  text-align: center;
  margin-top: 20px;
}


.title-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 8px;
  padding-left: 10px;
  padding-right: 10px;
  margin-bottom: 10px;
}

.center-container {
  display: flex;
  justify-content: center;
  align-items: center;

}

.v-date-picker__title {
  font-size: 14px;
  /* ปรับขนาด font ของ title */
}
</style>
