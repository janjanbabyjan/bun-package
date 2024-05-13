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
  { text: 'เพิ่มรูป', href: '/admin/content/gallery/add' },
];

const getBreadcrumbText = (index: number) => {
  return breadcrumbs[index].text;
};

// ปุ่มเปิดปิด
const isOpen = ref(false); // เริ่มต้นเปิดให้เป็น false

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

// รูป
const imageUrl = ref<string>(''); // เก็บ URL ของรูปที่อัปโหลด
const fileInput = ref<HTMLInputElement | null>(null);

// Function to handle file upload
const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        imageUrl.value = reader.result;
      }
    };
    reader.readAsDataURL(file);
  } else {
    alert('โปรดเลือกไฟล์รูปภาพเท่านั้น');
  }
};

// Compute the style for the content area background
const contentAreaStyle = ref({
  backgroundImage: `url(${imageUrl.value})`,
  width: '100%',
  height: '300px', // Set the desired height here
});

// Update content area style when imageUrl changes
watchEffect(() => {
  contentAreaStyle.value.backgroundImage = `url(${imageUrl.value})`;
});


const saveImage = () => {
  // บันทึกรูปภาพได้ที่ imageUrl.value
  // ตัวอย่างการบันทึกรูปภาพ: axios.post('/upload', { image: imageUrl.value })
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

    <div class="center-container">
      <v-card elevation="10" class="withbg center-card" style="max-width: 1000px;">
        <v-card-item class="pa-6">

          <v-row class="mt-2">
            <v-col cols="12" md="4" style="max-width: 500px;">
              <v-text-field label="หัวข้อ"></v-text-field>

              <!-- ปุ่มเพื่อเปิด -->
              <v-switch id="isOpenSwitch" v-model="isOpen" class="ml-3 d-flex custom-switch"
                label="เปิด/ปิด"></v-switch>
            </v-col>
            <div>
              <div>
                <input type="text" v-model="inputText" placeholder="เพิ่มข้อความ">
                <button @click="addTag">เพิ่ม</button>
              </div>
              <div v-for="(tag, index) in tags" :key="index" class="tag">{{ tag }}</div>
            </div>

          </v-row>
        </v-card-item>
      </v-card>
    </div>

    <div class="center-container">
      <v-card class="withbg mt-4" style="max-width: 1000px;">
        <div class="title-section">
          <v-card-title class="text-h5 ml-3">เพิ่มรูป</v-card-title>
        </div>
        <!-- Content area -->
        <div class="content-area" :style="contentAreaStyle">
          <input type="file" @change="handleFileUpload" accept="image/*">
        </div>

        <div class="image-container">
          <div class="image-frame">
            <img :src="imageUrl" alt="Uploaded Image" v-if="imageUrl" class="image-preview">
          </div>
        </div>

        <v-btn color="primary" class="ml-5 mb-6" @click="saveImage">บันทึก</v-btn>
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

.content-area {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  /* กำหนดขอบให้เป็นสี่เหลี่ยม */
  max-width: 90%;
  margin-left: 35px;
  background-size: contain;
  /* แสดงตามสัดส่วนจริงของรูปภาพ */
  background-position: center;
  background-repeat: no-repeat;
  /* ป้องกันการทำซ้ำของรูปภาพ */
}

.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-frame {
  border: 2px solid #ccc;
  padding: 10px;
}

.image-preview {
  max-width: 100%;
  max-height: 100%;
}
</style>
