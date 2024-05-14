<script setup lang="ts">
import { Blog } from '@/data/dashboard/dashboardData';
import { useRoute } from 'vue-router';

const route = useRoute();
const contentId = +route.params.id;

const content = Blog.find((item) => item.id === contentId);

</script>

<template>
  <div class="d-flex flex-column gap-1 mx-1 pt-4  ">
    <div class="mb-6">
      <v-card elevation="10" v-if="content">
        <div class="py-10 px-10">
          <h2>{{ content.title }}</h2>
          {{ content.date }}
        </div>

        <div class="py-6 px-4 pt-0 d-flex justify-center">
          <img :src="content.img" :alt="content.title" />
        </div>
        <div class="py-10 px-10 text-justify">
          <p> {{ content.desc }}</p>

        </div>
        <div class="py-10 px-10 text-justify">
          <v-chip color="primary" height="auto" size="small" variant="tonal" rounded="md">{{
            content.badge
          }}</v-chip>
        </div>
      </v-card>
      <v-card v-else>
        <p>Content not found.</p>
      </v-card>
    </div>
  </div>

</template>



<style>

img {
  width: 700px;
}

.v-footer {
  width: 100%;
}

</style>