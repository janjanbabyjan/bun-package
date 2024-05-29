<template>
  
  <v-list>
    <!-- Loop through the manageMenus array to create the main list groups -->
    <template v-for="menu in menuTree" :key="menu.id">
      <v-list-group :value="menu.menuName">
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props">
            {{ menu.menuName }}
          </v-list-item>
        </template>

        <!-- Nested list groups and items -->
        <template v-for="child in menu.children" :key="child.id">
          <v-list-group v-if="child.children && child.children.length > 0" :value="child.menuName">
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" style="color: #5b5b5b">
                {{ child.menuName }}
              </v-list-item>
            </template>
          </v-list-group>
        </template>
      </v-list-group>
    </template>
  </v-list>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { getAllManageMenus, getAllSinglePages } from "@/plugins/api/authService";

interface Menu {
  id: number;
  menuName: string;
  parentId: number | null;
  children?: Menu[];
}

const manageMenus = ref<Menu[]>([]);
const fetchManageMenus = async () => {
  try {
    const response = await getAllManageMenus();
    manageMenus.value = response.result.manageMenus;
  } catch (error) {
    console.error("Error fetching manage menus:", error);
  }
};

interface SinglePage {
  id: number;
  title: string;
  menuId: number;
}

const singlePages = ref<SinglePage[]>([]);
const fetchSinglePages = async () => {
  try {
    const response = await getAllSinglePages();
    singlePages.value = response.result.singlePage;
  } catch (error) {
    console.error("Error fetching single pages:", error);
  }
};

// ฟังก์ชันกรองหน้าโดยใช้ menuId
const filteredPages = (menuId: number) => {
  return singlePages.value.filter(page => page.menuId === menuId);
};

const selectLink = (page: SinglePage) => {
  // Handle link selection here
};

// สร้างโครงสร้างต้นไม้ของเมนูจาก manageMenus
const menuTree = computed(() => {
  const menuMap = new Map<number, Menu>();
  manageMenus.value.forEach((menu) => {
    menuMap.set(menu.id, { ...menu, children: [] });
  });

  const roots: Menu[] = [];
  menuMap.forEach((menu) => {
    if (menu.parentId === null) {
      roots.push(menu);
    } else {
      const parent = menuMap.get(menu.parentId);
      if (parent) {
        parent.children!.push(menu);
      }
    }
  });

  return roots;
});

onMounted(() => {
  fetchManageMenus();
  fetchSinglePages();
});
</script>

<style scoped>
.icon-size {
  font-size: 20px;
}
</style>
