<script setup>
definePageMeta({
  layout: "admin",
});
import AdminHeadingInputHeading from "@/components/admin/heading/input_heading.vue";


import { format } from 'date-fns'

const date = ref(new Date())


</script>

<template>
    <div> Hello Index Content Edit Article</div>

    <UPopover :popper="{ placement: 'bottom-start' }">
    <UButton icon="i-heroicons-calendar-days-20-solid" :label="format(date, 'd MMM, yyy')" />

    <template #panel="{ close }">
      <DatePicker v-model="date" is-required @close="close" />
    </template>
  </UPopover>
  <div>
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
  <div class="center-container">
    <v-card class="withbg mt-4" style="max-width: 1000px;">
      <AdminBodyGalleryInput @imageUploaded="handleImageUpload" />
      <v-btn color="primary" class="ml-5 mb-6" @click="getsave">Save</v-btn>


    </v-card>
  </div>

</template>




