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
import createPage from '~/plugins/api/createPage.js';
import ImageTool from '@editorjs/image';
import Swal from 'sweetalert2';



const router = useRouter();


const editor = ref<EditorJS | null>(null);
const editorContent = ref<any>(null);
const outputEditor = ref<EditorJS | null>(null);


// ตัวบอกหน้า
const breadcrumbs = [
  { text: 'หน้าแรก', href: '/admin' },
  { text: 'รายชื่อหน้าเว็บไซต์', href: '/admin/content/manage-single-page' },
  { text: 'เพิ่มคำบรรยาย', href: '/admin/content/article/add' },
];

const getBreadcrumbText = (index: number) => {
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
      image: SimpleImage,
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
const tags = ref<string[]>([]);

const newTag = ref(''); // New tag input


const handleSave = (data: any) => {
  console.log("🚀 ~ handleSave ~ data:", data)
  // เก็บข้อมูลที่ได้รับจาก component ตัวลูกเมื่อกดบันทึก
  saveName.value = data;
};

const handleStatus = (data: any) => {
  console.log("🚀 ~ handleSave ~ data:", data)
  // เก็บข้อมูลที่ได้รับจาก component ตัวลูกเมื่อกดบันทึก
  status.value = data;
};

const handleDate = (data: any) => {
  console.log("🚀 ~ handleSave ~ data:", data)
  // เก็บข้อมูลที่ได้รับจาก component ตัวลูกเมื่อกดบันทึก
  saveDate.value = data;
};



const handleTag = (data: string[]) => {
  tags.value = data;
  console.log("🚀 ~ handleTag ~ data:", data)
};

const getsave = async () => {
  const currentDateTime = new Date().toISOString();
  const editorData = await editor.value?.save();

  const postdata = {
    title: saveName.value,
    content: editorData,
    createdAt: currentDateTime,
    updatedAt: currentDateTime,
    timestampCreate: currentDateTime,
    titleImages: 'image-url',
    pageLink: '/new-page',
    isActive: status.value,
    typeId: 1,
    tag: tags.value.map(tag => ({ tagName : tag})) ,
    type: {
      id: 1,
      typeName: 'single pages',
      createdAt: currentDateTime,
      updatedAt: currentDateTime
    }
  };
  try {
    const response = await createPage.createSinglePage(postdata);
    console.log('Page creation response:', response);
    // เมื่อสร้างหน้าเสร็จสิ้น แสดง SweetAlert แจ้งเตือน
    Swal.fire({
      icon: 'success',
      title: 'สร้างหน้าใหม่สำเร็จ!',
      showConfirmButton: false,
      timer: 1500
    });
  } catch (error) {
    console.error('Error creating page:', error);

    // เมื่อเกิดข้อผิดพลาดในการสร้างหน้า แสดง SweetAlert แจ้งเตือน
    Swal.fire({
      icon: 'error',
      title: 'เกิดข้อผิดพลาดในการสร้างหน้า!',
      text: 'กรุณาลองใหม่อีกครั้ง',
      footer: '<a href="#">ติดต่อเรา</a>'
    });
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
    <AdminHeadingInputHeading :name="saveName" @name="handleSave" @status="handleStatus" @day="handleDate "
      @tag="handleTag" />

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

.center-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
