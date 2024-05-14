<script setup lang="ts">
definePageMeta({
  layout: "admin",
});

import { ref } from "vue";
import { productPerformance } from "@/data/dashboard/dashboardData";

// Breadcrumbs setup
const breadcrumbs = [
  { text: "หน้าแรก", href: "/admin" },
  { text: "จัดการเมนู", href: "/admin/ui-components/Buttons" },
];

const getBreadcrumbText = (index: number) => {
  return breadcrumbs[index].text;
};

// Dialog and menu states
const dialog = ref(false);
const newMenu = ref({
  name: "",
  link: "",
});
const isActive = ref(false);

// Link menu options
const linkOptions = ref([
  { label: "หน้าหลัก", value: "/" },
  { label: "เกี่ยวกับเรา", value: "/about" },
  { label: "ติดต่อเรา", value: "/contact" },
]);

// Methods
const openDialog = () => {
  dialog.value = true;
};

const closeDialog = () => {
  dialog.value = false;
  newMenu.value = { name: "", link: "" };
  isActive.value = false;
};

const addMenu = () => {
  // Logic to add menu using newMenu.value.name and newMenu.value.link
  console.log("Menu added:", newMenu.value);
  closeDialog();
};
</script>
<template>
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

    <v-card elevation="10" class="withbg">
      <v-card-item class="pa-6">
        <div class="d-flex align-center justify-space-between pt-sm-2">
          <v-card-title class="text-h5">จัดการเมนู</v-card-title>
          <!-- Move the Create Page button to the right -->
          <v-btn color="primary" class="ml-auto" @click="openDialog"
            >เพิ่มเมนูหลัก</v-btn
          >
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title class="mt-2">เพิ่มเมนู</v-card-title>

              <v-card-text>
                <v-text-field
                  v-model="newMenu.name"
                  label="ชื่อเมนู"
                  outlined
                ></v-text-field>
                <v-row>
                  <v-col cols="12">
                    <v-autocomplete
                      v-model="newMenu.link"
                      :items="linkOptions"
                      item-text="label"
                      item-value="value"
                      label="ลิงก์"
                      outlined                    ></v-autocomplete>
                  </v-col>
                </v-row>
                <v-switch
                  v-model="isActive"
                  label="แสดงเมนู"
                  :input-value="true"
                  :false-value="false"
                  class="toggle-switch"
                ></v-switch>
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" @click="addMenu">เพิ่ม</v-btn>
                <v-btn color="error" @click="closeDialog">ยกเลิก</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </v-card-item>

      <!-- Table -->
    </v-card>
  </div>
</template>
<style>
.breadcrumb-item {
  cursor: pointer;
}

.withbg {
  background-color: #ffffff;
}

.buttons-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.v-text-field .v-input__append-inner {
  cursor: pointer;
}
</style>
