<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getAllSinglePages } from "@/plugins/api/authService";
import Swal from "sweetalert2";
const singlePages = ref<SinglePage[]>([]);
const searchQuery = ref("");
// ประกาศตัวแปรแบบ ref สำหรับเก็บข้อมูล

// กำหนด interface สำหรับข้อมูล SinglePage และ PageType
interface SinglePage {
  id: number;
  title: string;
  pageLink?: string;
  typeId: number;
  isActive: boolean;
  type: PageType | null;
}

interface PageType {
  id: number;
  typeName: string;
}

// สร้างฟังก์ชันเพื่อดึงข้อมูล
const fetchSinglePages = async () => {
  try {
    const response = await getAllSinglePages();
    console.log("🚀 ~ fetchSinglePages ~ response:", response)
    singlePages.value = response.result.singlePage.map((page: any) => ({
      ...page,
      type: page.typeId ? { id: page.typeId, typeName: "" } : null,
    })) as SinglePage[];
    console.log(singlePages.value); // ตรวจสอบค่าที่ถูก set ให้กับ singlePages
  } catch (error) {
    console.error("Error fetching single pages:", error);
  }
};

// เรียกใช้งาน fetchSinglePages เมื่อคอมโพเนนต์ถูกโหลด
onMounted(() => {
  fetchSinglePages();
});
</script>
<template>
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

  <v-card elevation="10" class="withbg">
    <v-card-item class="pa-6">
      <div class="d-flex align-center justify-space-between pt-sm-2">
        <v-card-title class="text-h5">รายชื่อหน้าเว็บไซต์</v-card-title>
        <!-- Move the Create Page button to the right -->
        <v-btn color="primary" class="ml-auto" @click="openDialog"
          >สร้าง Content ใหม่</v-btn
        >
        <v-dialog v-model="dialog" max-width="500px">
          <v-card cols>
            <v-card-title class="mt-2">เลือกสร้าง Content</v-card-title>
            <v-card-text>
              <div class="buttons-container">
                <router-link to="/admin/content/article/add">
                  <v-btn color="primary" class="ml-5">เพิ่มคำบรรยาย</v-btn>
                </router-link>
                <router-link to="/admin/content/gallery/add">
                  <v-btn color="primary" style="width: 120px" class="ml-5"
                    >เพิ่มรูป</v-btn
                  >
                </router-link>
              </div>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" @click="closeDialog">ปิด</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>

      <!-- Search inputs -->
      <v-row class="mt-2">
        <v-col cols="12" md="4" style="max-width: 200px">
          <v-text-field label="ค้นหาชื่อ"></v-text-field>
        </v-col>
        <v-col cols="12" md="4" style="max-width: 200px">
          <v-select
            :items="['หมวดหมู่ 1', 'หมวดหมู่ 2', 'หมวดหมู่ 3']"
            label="สถานะ"
          ></v-select>
        </v-col>
        <v-col
          cols="12"
          md="4"
          class="d-flex justify-between align-center"
          style="max-width: 200px"
        >
          <v-select
            :items="['หมวดหมู่ 1', 'หมวดหมู่ 2', 'หมวดหมู่ 3']"
            label="ประเภท"
          ></v-select>
        </v-col>
        <div
          class="d-flex justify-between align-center"
          style="margin-top: -5px"
        >
          <v-btn style="margin-top: -1.2rem" color="primary" class="ml-3"
            >ค้นหา</v-btn
          >
          <v-btn style="margin-top: -1.2rem" color="error" class="ml-3"
            >ล้าง</v-btn
          >
        </div>
      </v-row>
    </v-card-item>

    <!-- ตาราง -->
    <v-table class="month-table">
      <thead>
        <tr>
          <th class="text-subtitle-1 font-weight-bold">#</th>
          <th class="text-subtitle-1 font-weight-bold">หัวข้อ</th>
          <th class="text-subtitle-1 font-weight-bold">ประเภท</th>
          <th class="text-subtitle-1 font-weight-bold">สถานะ</th>
          <th class="text-subtitle-1 font-weight-bold">จัดการ</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="page in singlePages" :key="page.id" class="month-item">
          <td>
            <p class="text-15 font-weight-medium">{{ page.id }}</p>
          </td>
          <td>
            <div class="">
              <h6 class="text-subtitle-1 font-weight-bold">{{ page.title }}</h6>
              <div class="text-subtitle-2 mt-1 text-muted">
                {{ page.pageLink }}
              </div>
            </div>
          </td>
          <td>
            <h6 class="text-body-1 text-muted" v-if="page.type">
              {{ page.type.id }}{{ page.type.typeName }}{{ page.type }}
            </h6>
            <h6 class="text-body-1 text-muted" v-else>ไม่มีประเภท</h6>
          </td>
          <td>
            <v-switch v-model="page.isActive" color="primary"></v-switch>
          </td>
          <td>
            <router-link :to="`/admin/content/article/edit/${page.id}`">
              <v-icon class="ml-3" style="color: red">mdi-pencil</v-icon>
            </router-link>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-card>
  <!-- <v-btn color="primary" class="ml-auto" @click="showSuccessAlert"
    >สร้าง Content ใหม่</v-btn
  > -->
</template>

<style>
.breadcrumb-item {
  cursor: pointer;
}

.buttons-container {
  display: flex;
  justify-content: center;
  /* จัดวางตรงกลางแนวนอน */
  align-items: center;
  /* จัดวางตรงกลางแนวตั้ง */
  height: 100%;
}
</style>
