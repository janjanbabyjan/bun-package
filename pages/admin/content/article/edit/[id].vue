<script setup>
definePageMeta({
  layout: "admin",
});
import { getSinglePageById } from '~/plugins/api/authService'; // แก้ไขเป็นชื่อโมดูลและฟังก์ชั่น API ของคุณ
import { format } from 'date-fns'
import AdminHeadingInputHeading from "@/components/admin/heading/input_heading.vue";

const date = ref(new Date())

const getsave = async () => {
  const currentDateTime = new Date().toISOString();
  const editorData = await editor.value?.save();

  const postdata = {
    title: saveName.value,
    content: editorData,
    createdAt: currentDateTime,
    updatedAt: currentDateTime,
    timestampCreate: currentDateTime,
    titleImages: "image-url",
    pageLink: "/new-page",
    isActive: status.value,
    typeId: 1,
    tag: tags.value.map((tag) => ({ tagName: tag })),
    type: {
      id: 1,
      typeName: "single pages",
      createdAt: currentDateTime,
      updatedAt: currentDateTime,
    },
  };
  try {
    const response = await createPage.createSinglePage(postdata);
    console.log("Page creation response:", response);
    // เมื่อสร้างหน้าเสร็จสิ้น แสดง SweetAlert แจ้งเตือน
    Swal.fire({
      icon: "success",
      title: "สร้างหน้าใหม่สำเร็จ!",
      showConfirmButton: false,
      timer: 1500,
    });
  } catch (error) {
    console.error("Error creating page:", error);

    Swal.fire({
      icon: "error",
      title: "เกิดข้อผิดพลาดในการสร้างหน้า!",
      text: "กรุณาลองใหม่อีกครั้ง",
      footer: '<a href="#">ติดต่อเรา</a>',
    });
  }
};
onMounted(async () => {
  try {
    // เรียกใช้ getSinglePageById และระบุ ID ของ Single Page ที่ต้องการดึงข้อมูล
    const response = await getSinglePageById(/* ระบุ ID ของ Single Page ที่ต้องการ */);
    singlePage.value = response.data; // แปลงข้อมูลให้อยู่ในรูปแบบที่เหมาะสมกับโค้ด Vue ของคุณ
  } catch (error) {
    console.error('Error fetching single page:', error);
  }
});
</script>

<template>
  
    <div> Hello Index Content Edit Article</div>
    <div> {{}}</div>
    <div>
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
    <UButton icon="i-heroicons-calendar-days-20-solid" :label="format(date, 'd MMM, yyy')" />

    <template #panel="{ close }">
      <DatePicker v-model="date" is-required @close="close" />
    </template>
  </UPopover>

</template>




