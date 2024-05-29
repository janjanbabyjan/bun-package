<template>
  <v-list>
    <template v-for="menu in menuTree">
      <v-list-group v-if="!menu.parentId" :key="menu.id" :value="menu.menuName">
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props">
            {{ menu.menuName }}
          </v-list-item>
        </template>

        <v-list-group v-if="menu.children && menu.children.length > 0" v-for="child in menu.children" :key="child.id" :value="child.menuName">
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" style="color: #5b5b5b">
              {{ child.menuName }}
            </v-list-item>
          </template>
          
          <!-- <v-list-item v-bind="props" style="color: #5b5b5b">
              {{ page.menuName }}
            </v-list-item> -->
         
          
        </v-list-group>
      </v-list-group>
    </template>
  </v-list>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { getAllManageMenus, getAllSinglePages } from "@/plugins/api/authService";
import { ApertureIcon, CopyIcon, LayoutDashboardIcon, NewsIcon, NewSectionIcon, FilesIcon } from 'vue-tabler-icons'; // Adjust the import as needed

interface Menu {
  id: number;
  menuName: string;
  path?: string;
  pageLink?: string;
  parentId?: number | null;
  children?: Menu[];
}

interface SinglePage {
  id: number;
  title: string;
  pageLink?: string;
}

const manageMenus = ref<Menu[]>([]);
const singlePages = ref<SinglePage[]>([]);

const fetchManageMenus = async () => {
  try {
    const response = await getAllManageMenus();
    manageMenus.value = response.result.manageMenus;
  } catch (error) {
    console.error("Error fetching manage menus:", error);
  }
};

const fetchSinglePages = async () => {
  try {
    const response = await getAllSinglePages();
    singlePages.value = response.result.singlePage;
  } catch (error) {
    console.error("Error fetching single pages:", error);
  }
};

const selectLink = (page: SinglePage) => {
  // Handle link selection here
};

const buildMenuTree = (menuItems: Menu[]) => {
  const menuMap = new Map<number, Menu>();
  const roots: Menu[] = [];

  menuItems.forEach(item => {
    menuMap.set(item.id, { ...item, children: [] });
  });

  menuMap.forEach(item => {
    if (item.parentId === null || item.parentId === undefined) {
      roots.push(item);
    } else {
      const parent = menuMap.get(item.parentId);
      if (parent) {
        parent.children?.push(item);
      }
    }
  });

  return roots;
};

const menuTree = computed(() => buildMenuTree(manageMenus.value));

onMounted(() => {
  fetchManageMenus();
  fetchSinglePages();
});
</script>

<style scoped>

</style>
