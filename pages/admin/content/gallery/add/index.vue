<!-- pages\admin\content\gallery\add\index.vue -->
<script setup lang="ts">

// api
import axios from 'axios';

const baseApiUrl = useRuntimeConfig().public.apiBase;

definePageMeta({
  layout: "admin",
});

// Breadcrumbs
const breadcrumbs = [
  { text: 'Home', href: '/admin' },
  { text: 'Website Pages', href: '/admin/content/manage-single-page' },
  { text: 'Add Gallery', href: '/admin/content/gallery/add' },
];

const getBreadcrumbText = (index: number) => {
  return breadcrumbs[index].text;
};



// Save data
const saveName = ref('');
const status = ref(true);
const saveDate = ref('');
const inputText = ref('');
const uploadedFile = ref<File | null>(null);


const getsave = async () => {
  const currentDateTime = new Date().toISOString();

  const postdata = {
    title: saveName.value,
    content: {
      blocks: [
        {
          "type": "image",
          "data": {
            "url": uploadedFile.value
          }
        }
      ]
    },
    createdAt: currentDateTime,
    updatedAt: currentDateTime,
    timestampCreate: currentDateTime,
    titleImages: 'image-url',
    pageLink: '/new-page',
    isActive: status.value,
    typeId: 1,
    tag: inputText.value,
    type: {
      id: 1,
      typeName: 'Gallery',
      createdAt: currentDateTime,
      updatedAt: currentDateTime
    }
  };


  try {
    const response = await axios.post(`${baseApiUrl}/singlepage`, postdata);
    console.log(response);
    // jsonOutput.value = JSON.stringify(response.data, null, 2);
  } catch (error) {
    console.error('Error posting to single page:', error);
  }

};

const handleSave = (data: any) => {
  console.log("Data:", data)
  saveName.value = data;
};

const handleStatus = (data: any) => {
  console.log("Data:", data)
  status.value = data;
};

const handleDate = (data: any) => {
  console.log("Data:", data)
  saveDate.value = data;
};

const handleTag = (data: any) => {
  console.log("Data:", data);
  inputText.value = data;
};

const handleImageUpload = (file: File) => {
  console.log('Image File:', file);
  uploadedFile.value = file;
};

const jsonOutput = ref('');
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
  </div>

  <AdminHeadingInputHeading :name="saveName" @name="handleSave" @status="handleStatus" @day="handleDate"
    @tag="handleTag" />

  <v-card class="mt-3">
    <AdminBodyGalleryInput @imageUploaded="handleImageUpload" />
    <v-btn color="primary" class="ml-5 mb-6" @click="getsave">Save</v-btn>
    <pre>{{ jsonOutput }}</pre>
  </v-card>
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
