<script setup>
definePageMeta({ layout: "admin", });

import { ref, onMounted, watch } from 'vue';
import AdminHeadingInputHeading from "@/components/admin/heading/input_heading.vue";
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const id = route.params.id;

const pageData = ref({
  title: '',
  status: false,
  day: '',
  tag: []
});

const fetchGalleryData = async () => {
    try {
        const response = await axios.get(`http://localhost:8000/singlepage/${id}`);
        console.log('API response:', response.data); // Debug log
        const data = response.data.data;
        pageData.value = {
          title: data.title,
          status: data.isActive,
          day: data.createdAt,
          tag: data.tag ? data.tag.map(t => t.tagName) : []
        };
        console.log('Updated pageData:', pageData.value); // Debug log
    } catch (error) {
        console.error('Error fetching gallery data:', error);
    }
  };

onMounted(fetchGalleryData);


const handleSave = (newName) => {
  pageData.value.title = newName;
};

const handleStatus = (newStatus) => {
  pageData.value.status = newStatus;
};

const handleDate = (newDate) => {
  pageData.value.day = newDate;
};

const handleTag = (newTag) => {
  pageData.value.tag = newTag;
};

const handleAddTag = (newTag) => {
  pageData.value.tag.push(newTag);
};

const handleEditTag = (index, updatedTag) => {
  pageData.value.tag[index] = updatedTag;
};

const handleRemoveTag = (index) => {
  pageData.value.tag.splice(index, 1);
};

// const getsave = async () => {
//   try {
//     await axios.put(`http://localhost:8000/singlepage/${id}`, pageData.value);
//     alert('Data updated successfully!');
//   } catch (error) {
//     console.error('Error updating data:', error);
//   }
// };
</script>

<template>
  <AdminHeadingInputHeading :title="pageData.title" :status="pageData.status" :day="pageData.day"
    :tag="pageData.tag" @title="handleSave" @status="handleStatus" @day="handleDate" @tag="handleTag"
    @addTag="handleAddTag" @editTag="handleEditTag" @removeTag="handleRemoveTag" />
  <div class="center-container">
    <v-card class="withbg mt-4" style="max-width: 1000px;">
      <AdminBodyGalleryInput @imageUploaded="handleImageUpload" />
      <v-btn color="primary" class="ml-5 mb-6" @click="getsave">Save</v-btn>
    </v-card>
  </div>
</template>
