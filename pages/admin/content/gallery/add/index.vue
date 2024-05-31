<!-- pages\admin\content\gallery\add\index.vue -->
<script setup lang="ts">
import axios from 'axios';
import createPage from '~/plugins/api/createPage.js';
import { computed } from 'vue';


definePageMeta({
  layout: "admin",
});

// const baseUrl = 'http://localhost:8000';

// const getImageUrl = (imagePath: any) => {
//   const baseUrl = 'http://localhost:8000';
//   const fullUrl = `${baseUrl}${imagePath}`;
//   console.log('Full Image URL:', fullUrl);
//   return fullUrl;
// };


const breadcrumbs = [
  { text: 'หน้าแรก', href: '/admin' },
  { text: 'รายชื่อหน้าเว็บไซต์ ', href: '/admin/content/manage-single-page' },
  { text: 'เพิ่มรูปภาพ', href: '/admin/content/gallery/add' },
];

const getBreadcrumbText = (index: number) => {
  return breadcrumbs[index].text;
};

const uploadedFiles = ref<string[]>([]);
const saveName = ref('');
const status = ref(true);
const saveDate = ref('');
const inputText = ref('');
const tags = ref<string[]>([]);


import Swal from 'sweetalert2';

const getsave = async () => {
  const currentDateTime = new Date().toISOString();
  const postdata = {
    title: saveName.value,
    content: uploadedFiles.value,
    createdAt: currentDateTime,
    updatedAt: currentDateTime,
    timestampCreate: saveDate.value,
    titleImages: 'image-url',
    pageLink: '/new-page',
    isActive: status.value,
    typeId: 2,
    tag: tags.value.map(tag => ({ tagName : tag})) ,
    type: { id: 2, typeName: 'gallery', createdAt: currentDateTime, updatedAt: currentDateTime }
  };
  try {
    const response = await createPage.createSinglePage(postdata);
    console.log('Page creation response:', response);
    // แสดง SweetAlert หลังจากสร้างหน้าเสร็จสิ้น
    Swal.fire({
      icon: 'success',
      title: 'สร้างอัลบั้มสำเร็จ!',
      showConfirmButton: false,
      timer: 1500
    });
  } catch (error) {
    console.error('Error creating page:', error);
    // แสดง SweetAlert เมื่อเกิดข้อผิดพลาดในการสร้างหน้า
    Swal.fire({
      icon: 'error',
      title: 'เกิดข้อผิดพลาดในการสร้างหน้า!',
      text: 'กรุณาลองใหม่อีกครั้ง',
      footer: '<a href="#">ติดต่อเรา</a>'
    });
  }
};


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
  tags.value = data;
  console.log("🚀 ~ handleTag ~ data:", data)
};


const handleImageUpload = (imagePaths: string[]) => {
  uploadedFiles.value = imagePaths;
};
const jsonOutput = ref('');

function emit(arg0: string, fullUrl: string) {
  throw new Error('Function not implemented.');
}
</script>

<template>
  <div>
    <v-breadcrumbs>
      <v-breadcrumbs-item v-for="(breadcrumb, index) in breadcrumbs" :key="index" @click="navigateTo(breadcrumb.href)"
        class="breadcrumb-item">
        {{ getBreadcrumbText(index) }}
        <template v-if="index < breadcrumbs.length - 1"> > </template>
      </v-breadcrumbs-item>
    </v-breadcrumbs>
  </div>
  <AdminHeadingInputHeading :title="saveName" :day="saveDate" @title="handleSave" @status="handleStatus" @day="handleDate"
    @tag="handleTag" />
  <div class="center-container">
    <v-card class="withbg mt-4" style="max-width: 1000px;">
      <AdminBodyGalleryInput @imageUploaded="handleImageUpload" />
      <v-btn color="primary" class="ml-5 mb-6" @click="getsave">Save</v-btn>


    </v-card>
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

.v-card {
  padding: 1rem;
}
</style>
