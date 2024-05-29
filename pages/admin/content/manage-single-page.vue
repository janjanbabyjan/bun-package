<script setup lang="ts">
import { computed } from "vue";
import { ref, onMounted, watch } from "vue";
import {
  getAllSinglePages,
  getAllPageTypes,
  updateSinglePageById,
} from "@/plugins/api/authService";
import Swal from "sweetalert2";

const singlePages = ref<SinglePage[]>([]);
const filteredPages = ref<SinglePage[]>([]);
const searchQuery = ref("");
const selectedStatus = ref<boolean | null>(null);
const selectedCategory = ref<string | null>(null);

definePageMeta({
  layout: "admin",
});

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

const fetchSinglePages = async () => {
  try {
    const response = await getAllSinglePages();
    singlePages.value = response.result.singlePage;
    filterPages();
  } catch (error) {
    console.error("Error fetching single pages:", error);
  }
};

const filterPages = () => {
  filteredPages.value = singlePages.value.filter((page) => {
    const matchesQuery = page.title
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase());
    const matchesStatus =
      selectedStatus.value === null ||
      (selectedStatus.value === true && page.isActive) ||
      (selectedStatus.value === false && !page.isActive);
    const matchesCategory =
      selectedCategory.value === null ||
      (page.type && page.type.typeName === selectedCategory.value);
    return matchesQuery && matchesStatus && matchesCategory;
  });
};

watch([searchQuery, selectedStatus, selectedCategory], filterPages);

const isOpen = ref(false);

const dialog = ref(false);

const openDialog = () => {
  dialog.value = true;
};

const closeDialog = () => {
  dialog.value = false;
};

const pageTypes = ref<string[]>([]);

const fetchPageTypes = async () => {
  try {
    const response = await getAllPageTypes();
    pageTypes.value = response.result.map(
      (type: { typeName: string }) => type.typeName
    );
  } catch (error) {
    console.error("Error fetching page types:", error);
  }
};

const resetFilters = () => {
  searchQuery.value = "";
  selectedStatus.value = null;
  selectedCategory.value = null;
  filterPages();
};

interface StatusOption {
  texts: string;
  value: boolean | null;
}

const statusOptions: StatusOption[] = [
  { texts: "เปิด", value: true },
  { texts: "ปิด", value: false },
];

const filteredStatusOptions = computed(() =>
  statusOptions.filter((option) => option.value !== null)
);

const updateSinglePageByIds = async (pageId: number, updatedData: any) => {
  try {
    const response = await updateSinglePageById(pageId, updatedData);
    console.log("Updated Single Page:", response);
    // อัพเดทหรือดำเนินการตามต้องการ
  } catch (error) {
    console.error("Error updating single page:", error);
  }
};

const saveSinglepage = async (pageId: number, isActive: boolean) => {
  try {
    // ทำการอัพเดตข้อมูล isActive ในฐานข้อมูล
    const response = await updateSinglePageById(pageId, { isActive });
    console.log("Updated Single Page:", response);
    // อัพเดทหรือดำเนินการตามต้องการ
  } catch (error) {
    console.error("Error updating single page:", error);
  }
};

onMounted(() => {
  fetchSinglePages();
  fetchPageTypes();
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
          <v-text-field label="ค้นหาชื่อ" v-model="searchQuery"></v-text-field>
        </v-col>
        <v-col cols="12" md="4" style="max-width: 200px">
          <v-select
            label="สถานะ"
            :items="statusOptins"
            v-model="selectedStatus"
            item-text="texts"
            item-value="value"
            variant="outlined"
          ></v-select>
        </v-col>
        <v-col
          cols="12"
          md="4"
          class="d-flex justify-between align-center"
          style="max-width: 200px"
        >
          <v-select
            label="ประเภท"
            :items="pageTypes"
            v-model="selectedCategory"
            variant="outlined"
          ></v-select>
        </v-col>
        <div
          class="d-flex justify-between align-center"
          style="margin-top: -5px"
        >
          <v-btn
            style="margin-top: -1.2rem"
            color="primary"
            class="ml-3"
            @click="filterPages"
            >ค้นหา</v-btn
          >
          <v-btn
            style="margin-top: -1.2rem"
            color="error"
            class="ml-3"
            @click="resetFilters"
            >ล้าง</v-btn
          >
        </div>
      </v-row>
    </v-card-item>

    <!-- ตาราง -->
    <v-table class="month-table">
      <thead>
        <tr>
          <th class="text-subtitle-1 font-weight-bold"></th>
          <th class="text-subtitle-1 font-weight-bold">หัวข้อ</th>
          <th class="text-subtitle-1 font-weight-bold">ประเภท</th>
          <th class="text-subtitle-1 font-weight-bold">สถานะ</th>
          <th class="text-subtitle-1 font-weight-bold">จัดการ</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="page in filteredPages" :key="page.id" class="month-item">
          <td>
            <!-- <p class="text-15 font-weight-medium">{{ page.id }}</p> -->
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
            <h6 class="text-body-1 text-muted">
              {{ page.type ? page.type.typeName : "ไม่มีประเภท" }}
            </h6>
          </td>
          <td>
            <v-switch
              v-model="page.isActive"
              color="primary"
              @change="saveSinglepage(page.id, page.isActive)"
            ></v-switch>
          </td>
          <td>
            <router-link
              :to="
                page.typeId === 1
                  ? `/admin/content/article/edit/${page.id}`
                  : `/admin/content/gallery/edit/${page.id}`
              "
            >
              <v-icon class="ml-3" style="color: red">mdi-pencil</v-icon>
            </router-link>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-card>
</template>

<style>
.breadcrumb-item {
  cursor: pointer;
}

.buttons-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
