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


const editor = ref<EditorJS | null>(null);
const editorContent = ref<any>(null);
const outputEditor = ref<EditorJS | null>(null);

const router = useRouter();

const saveName = ref('');
const status = ref(true);
const saveDate = ref('');
const tags = ref<string[]>([]);
const newTag = ref(''); // New tag input
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
// const saveName = ref('');
// const status = ref(true);
// const saveDate = ref('');
// const inputText = ref('');

// const tags = ref<string[]>([]);

const handleSave = (data: any) => {
  saveName.value = data;
};

const handleStatus = (data: any) => {
  status.value = data;
};

const handleDate = (data: any) => {
  saveDate.value = data;
};

const handleTag = (data: string[]) => {
  tags.value = data; // เก็บแท็กเป็น array
};
const addTag = () => {
  if (newTag.value.trim() !== "") {
    tags.value.push(newTag.value.trim());
    newTag.value = "";
  }
};

// Remove tag
const removeTag = (index: number) => {
  tags.value.splice(index, 1);
};
// Save data
const getsave = async () => {
  if (!editor.value) {
    console.error('Editor instance is not initialized');
    return;
  }

  const currentDateTime = new Date().toISOString();
  try {
    const editorData = await editor.value.save();
    
    const postdata = {
      title: saveName.value,
      content: {
        html: editorData.blocks.map(block => block.data.text).join('') // Assuming blocks contain HTML content
      },
      typeId: 1,
      titleImages: 'image-url',
      pageLink: null,
      isActive: status.value,
      tag: tags.value.map(tag => ({ tagName: tag })) // Format tags
    };

    const response = await createPage.createSinglePage(postdata);
    console.log('Page creation response:', response);
    if (response.statusCode === 201 && response.result && response.result.data) {
      console.log("Article created successfully:", response.result);
      router.push(response.result.data.pageLink);
    } else {
      console.error("Unexpected response:", response);
    }
  } catch (error) {
    console.error('Error saving editor data:', error);
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

    <!-- Admin heading input -->
    <AdminHeadingInputHeading :name="saveName" @name="handleSave" @status="handleStatus" @day="handleDate"
      @tag="handleTag" />

    <div class="center-container">
      <v-card class="withbg mt-4" style="max-width: 1000px;">
        <div class="title-section">
          <v-card-title class="text-h5 ml-3">เพิ่มคำบรรยาย</v-card-title>
        </div>
        <!-- Content area -->
        <div class="editor-wrapper">
          <div id="editor" class="editor"></div>
        </div>
        
        <!-- Tag Input -->
        <div class="tags-container">
          <v-text-field v-model="newTag" label="Add Tag"></v-text-field>
          <v-btn @click="addTag">Add Tag</v-btn>
        </div>
        <div class="tags-list">
          <v-chip v-for="(tag, index) in tags" :key="index" @click:close="removeTag(index)">
            {{ tag }}
            <v-icon small @click="removeTag(index)">mdi-close</v-icon>
          </v-chip>
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
