<script setup>
definePageMeta({
  layout: "admin",
});
import AdminHeadingInputHeading from "@/components/admin/heading/input_heading.vue";
import { format } from 'date-fns'
import { useRoute } from 'vue-router';
import axios from 'axios';

const date = ref(new Date())
const route = useRoute();
const id = route.params.id;
const galleryData = ref(null);

const fetchGalleryData = async () => {
  const response = await axios.get(`http://localhost:8000/singlepage/${id}`);
  galleryData.value = response.data;
};

onMounted(fetchGalleryData);

</script>

<template>

  <AdminHeadingInputHeading :name="saveName" @name="handleSave" @status="handleStatus" @day="handleDate"
    @tag="handleTag" />
  <div class="center-container">
    <v-card class="withbg mt-4" style="max-width: 1000px;">
      <AdminBodyGalleryInput @imageUploaded="handleImageUpload" />
      <v-btn color="primary" class="ml-5 mb-6" @click="getsave">Save</v-btn>
    </v-card>
  </div>

</template>
