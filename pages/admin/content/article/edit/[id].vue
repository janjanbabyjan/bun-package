<script setup>
definePageMeta({
  layout: "admin",
});
import { getSinglePageById } from "~/plugins/api/authService"; // แก้ไขเป็นชื่อโมดูลและฟังก์ชั่น API ของคุณ
import { format } from "date-fns";
import AdminHeadingInputHeading from "@/components/admin/heading/input_heading.vue";

const date = ref(new Date());

const router = useRouter();
const pageId = ref(null);
const pageData = ref(null);


onMounted(async () => {
  pageId.value = router.currentRoute.value.params.id;
  try {
    const response = await getSinglePageById(pageId.value);
    pageData.value = response.data;
  } catch (error) {
    console.error("Error fetching single page:", error);
  }
});
</script>

<template>

  <div>
    
    {{ pageData}}
    <!-- Breadcrumb navigation -->
    <v-breadcrumbs>
      <v-breadcrumbs-item
        v-for="(breadcrumb, index) in breadcrumbs"
        :key="index"
        @click="navigateTo(breadcrumb.href)"
        class="breadcrumb-item"
      >
        {{ getBreadcrumbText(index) }}
        <template v-if="index < breadcrumbs.length - 1"> > </template>
      </v-breadcrumbs-item>
    </v-breadcrumbs>

    <!-- เพิ่มตัวแปลด้วย ถ้าจะดึงจากลูก -->
    <AdminHeadingInputHeading
      :name="saveName"
      @name="handleSave"
      @status="handleStatus"
      @day="handleDate"
      @tag="handleTag"
    />

    <div class="center-container">
      <v-card class="withbg mt-4" style="max-width: 1000px">
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
  <UPopover :popper="{ placement: 'bottom-start' }">
    <UButton
      icon="i-heroicons-calendar-days-20-solid"
      :label="format(date, 'd MMM, yyy')"
    />

    <template #panel="{ close }">
      <DatePicker v-model="date" is-required @close="close" />
    </template>
  </UPopover>
</template>
