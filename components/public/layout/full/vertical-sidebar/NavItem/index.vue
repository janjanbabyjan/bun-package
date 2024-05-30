<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getAllManageMenus } from "@/plugins/api/authService";

interface ManageMenu {
  id: number;
  name: string;
  parentId?: number | null;
  pathMenu?: string;
  children?: ManageMenu[];
  isActive?: boolean;
}

const manageMenus = ref<ManageMenu[]>([]);

const fetchManageMenus = async () => {
  try {
    const response = await getAllManageMenus();
    manageMenus.value = response.result;
    console.log("🚀 ~ fetchManageMenus ~ manageMenus.value:", manageMenus.value);
    console.log("🚀 ~ fetchManageMenus ~ response:", response);
    console.log("🚀 ~ fetchManageMenus ~ response:", response.result);
  } catch (error) {
    console.error("Error fetching manage menus:", error);
  }
};

onMounted(() => {
  fetchManageMenus();
});

const navigateTo = (path: string | undefined) => {
  if (path) {
    // Replace with your navigation logic
    window.location.href = path; // ไปยัง path ที่กำหนด
  }
};
</script>

<template>
  <v-list>
    <template v-for="mainMenu in manageMenus" :key="mainMenu.id">
      <v-list-group>
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props" @click="navigateTo(mainMenu.pathMenu)">
            {{ mainMenu.name }}
          </v-list-item>
        </template>

        <v-list-group v-for="subMenu in mainMenu.children" :key="subMenu.id" v-if="mainMenu.children && mainMenu.children.length">
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" @click="navigateTo(subMenu.pathMenu)" style="color: #5b5b5b">
              {{ subMenu.name }}
            </v-list-item>
          </template>

          <v-list-item v-for="child in subMenu.children" :key="child.id" @click="navigateTo(child.pathMenu)" style="color: #5b5b5b">
            {{ child.name }}
          </v-list-item>
        </v-list-group>
      </v-list-group>
    </template>
  </v-list>
</template>

<style scoped></style>
