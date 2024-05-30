<!-- pages\admin\content\gallery\edit\[id].vue -->
<script setup>
definePageMeta({ layout: "admin", });

import { ref, onMounted, watch } from 'vue';
import AdminHeadingInputHeading from "@/components/admin/heading/input_heading.vue";
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const id = route.params.id;

const galleryData = ref({
  title: '',
  status: false,
  day: '',
  tag: [],
  content: []
});

const fetchGalleryData = async () => {
    try {
        const response = await axios.get(`http://localhost:8000/singlepage/${id}`);
        console.log('API response:', response.data); // Debug log
        const data = response.data.data;
        galleryData.value = {
          title: data.title,
          status: data.isActive,
          day: data.createdAt,
          tag: data.tag ? data.tag.map(t => t.tagName) : [],
          content: data.content ? data.content : []
        };
        console.log('Updated galleryData:', galleryData.value); // Debug log
    } catch (error) {
        console.error('Error fetching gallery data:', error);
    }
  };

onMounted(fetchGalleryData);


const handleSave = (newName) => {
  galleryData.value.title = newName;
};

const handleStatus = (newStatus) => {
  galleryData.value.status = newStatus;
};

const handleDate = (newDate) => {
  galleryData.value.day = newDate;
};

const handleTag = (newTag) => {
  galleryData.value.tag = newTag;
};

const handleAddTag = (newTag) => {
  galleryData.value.tag.push(newTag);
};

const handleEditTag = (index, updatedTag) => {
  galleryData.value.tag[index] = updatedTag;
};

const handleRemoveTag = (index) => {
  galleryData.value.tag.splice(index, 1);
};

const handleImageUpload = (uploadedImages) => {
  galleryData.value.content.push(...uploadedImages);
};

const handleImageRemove = (removedImageUrl) => {
  const index = galleryData.value.images.indexOf(removedImageUrl);
  if (index !== -1) {
    galleryData.value.content.splice(index, 1);
  }
};

// const getsave = async () => {
//   try {
//     await axios.put(`http://localhost:8000/singlepage/${id}`, galleryData.value);
//     alert('Data updated successfully!');
//   } catch (error) {
//     console.error('Error updating data:', error);
//   }
// };
</script>

<template>
  <AdminHeadingInputHeading :title="galleryData.title" :status="galleryData.status" :day="galleryData.day"
    :tag="galleryData.tag" @title="handleSave" @status="handleStatus" @day="handleDate" @tag="handleTag"
    @addTag="handleAddTag" @editTag="handleEditTag" @removeTag="handleRemoveTag" />
  <div class="center-container">
    <v-card class="withbg mt-4" style="max-width: 1000px;">
      <AdminBodyGalleryInput :initialImageUrls="galleryData.content" @imageUploaded="handleImageUpload" @imageRemoved="handleImageRemove" />
      <v-btn color="primary" class="ml-5 mb-6" @click="getsave">Save</v-btn>
    </v-card>
  </div>
</template>
