<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import {
  getAllManageMenus,
  deleteMenu,
  createNewMenu,
  updateMenu,
} from "@/plugins/api/authService";

definePageMeta({
  layout: "admin",
});

// Path selection dialog state
const dialog = ref(false);
const newMenuName = ref("");
const newMenuLink = ref("");
const isActive = ref(false);
const pathDialog = ref(false);
const linkOptions = ref([
  { label: "หน้าหลัก", value: "/" },
  { label: "เกี่ยวกับเรา", value: "/about" },
  { label: "ติดต่อเรา", value: "/contact" },
]);

// Category and search state
const category = ref("");
const searchQuery = ref("");

// Open main dialog
const openDialog = () => {
  dialog.value = true;
};

const closeDialog = () => {
  dialog.value = false;
  newMenuName.value = "";
  newMenuLink.value = "";
  isActive.value = false;
  isEditMode.value = false;
  currentMenuId.value = null;
};

const selectLink = (item: { value: string }) => {
  newMenuLink.value = item.value;
  pathDialog.value = false;
};
const handleAddMenu = async (id: number) => {
  
};

// Open path dialog
const openPathDialog = () => {
  pathDialog.value = true;
};

// Clear search
const clearSearch = () => {
  searchQuery.value = "";
  category.value = "";
};

// Search function (placeholder)
const search = () => {
  console.log("Search query:", searchQuery.value, "Category:", category.value);
};

// ตัวบอกหน้า
const breadcrumbs = [
  { text: "หน้าแรก", href: "/admin" },
  { text: "จัดการเมนู", href: "/admin/content/manage-menu" },
];

const getBreadcrumbText = (index: number) => {
  return breadcrumbs[index].text;
};

// Data and methods for fetching and displaying manage menus
const manageMenus = ref([]);

const fetchManageMenus = async () => {
  try {
    const response = await getAllManageMenus();
    manageMenus.value = response.result.manageMenus;
  } catch (error) {
    console.error("Error fetching manage menus:", error);
  }
};

onMounted(() => {
  fetchManageMenus();
});

// Function to create new menu
const createNewMenus = async () => {
  try {
    await createNewMenu(newMenuName.value, newMenuLink.value, isActive.value);
    fetchManageMenus();
    closeDialog();
  } catch (error) {
    console.error('Error creating menu:', error);
  }
};

// Function to update menu
const updateMenu = async (id: number, updatedMenuData: any) => {
  try {
    const response = await axios.post(`/manage-menu/${id}`, updatedMenuData);
    console.log('Updated menu:', response.data);
    fetchManageMenus(); // Refresh the menu list after updating
  } catch (error) {
    console.error('Error updating menu:', error);
  }
};

// Function to save menu (create or update)
const saveMenu = () => {
  if (isEditMode.value) {
    updateExistingMenu();
  } else {
    createNewMenus();
  }
};

// Function to build menu tree from flat list
const buildMenuTree = (menuItems: any[]) => {
  const menuMap = new Map();
  const roots: any[] = [];

  menuItems.forEach((item) => {
    menuMap.set(item.id, { ...item, children: [] });
  });

  menuMap.forEach((item) => {
    if (item.parentId === null) {
      roots.push(item);
    } else {
      menuMap.get(item.parentId).children.push(item);
    }
  });

  return roots;
};

const menuTree = computed(() => buildMenuTree(manageMenus.value));

// Delete menu function
const handleDeleteMenu = async (id: number) => {
  try {
    await deleteMenu(id);
    fetchManageMenus(); // Refresh the menu list after deletion
  } catch (error) {
    console.error("Error deleting menu:", error);
  }
};

// State for editing menu
const isEditMode = ref(false);
const currentMenuId = ref<number | null>(null);

// Function to handle edit menu
const handleEditMenu = (menu: any) => {
  currentMenuId.value = menu.id;
  newMenuName.value = menu.menuName;
  newMenuLink.value = menu.menuLink;
  isActive.value = menu.isActive;
  isEditMode.value = true;
  dialog.value = true;
};

// Function to update existing menu
const updateExistingMenu = async () => {
  if (currentMenuId.value !== null) {
    try {
      const updatedMenuData = {
        menuName: newMenuName.value,
        menuLink: newMenuLink.value,
        isActive: isActive.value,
      };
      await updateMenu(currentMenuId.value, updatedMenuData);
      fetchManageMenus();
      closeDialog();
    } catch (error) {
      console.error('Error updating menu:', error);
    }
  }
};

// Data for expandable list
const open = ref(['Users']);
</script>

<template>
  <div>
    <!-- Breadcrumb navigation -->
    <v-breadcrumbs>
      <v-breadcrumbs-item v-for="(breadcrumb, index) in breadcrumbs" :key="index" @click="navigateTo(breadcrumb.href)"
        class="breadcrumb-item">
        {{ getBreadcrumbText(index) }}
        <template v-if="index < breadcrumbs.length - 1"> > </template>
      </v-breadcrumbs-item>
    </v-breadcrumbs>

    <v-card elevation="10" class="withbg">
      <v-card-item class="pa-6">
        <div class="d-flex align-center justify-space-between pt-sm-2">
          <v-card-title class="text-h5">จัดการเมนู</v-card-title>
          <v-btn color="primary" class="ml-auto" @click="openDialog">เพิ่มเมนูหลัก</v-btn>
          <v-dialog v-model="dialog" class="custom-dialog">
            <v-card>
              <v-card-title class="mt-2">{{ isEditMode ? 'แก้ไขเมนู' : 'เพิ่มเมนู' }}</v-card-title>

              <v-card-text>
                <v-text-field v-model="newMenuName" label="ชื่อเมนู" outlined></v-text-field>
                <v-row>
                  <v-col cols="10">
                    <v-text-field v-model="newMenuLink" label="ลิงก์" outlined readonly
                      @click="openPathDialog"></v-text-field>
                  </v-col>
                  <v-col cols="2">
                    <v-btn color="primary" @click="openPathDialog">เลือก</v-btn>
                  </v-col>
                </v-row>
                <v-switch v-model="isActive" label="แสดงเมนู" :input-value="true" :false-value="false"
                  class="toggle-switch"></v-switch>
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" @click="saveMenu">{{ isEditMode ? 'บันทึกการเปลี่ยนแปลง' : 'เพิ่ม' }}</v-btn>
                <v-btn color="error" @click="closeDialog">ยกเลิก</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <!-- Path Selection Dialog -->
          <v-dialog v-model="pathDialog" class="custom-path-dialog align-center">
            <v-card>
              <v-card-title class="mt-2">เลือกเส้นทาง</v-card-title>
              <v-card-text class="scrollable-content">
                <v-row class="align-center">
                  <v-col cols="3">
                    <v-select v-model="category" :items="['หมวดหมู่ 1', 'หมวดหมู่ 2', 'หมวดหมู่ 3']"
                      label="เลือกหมวดหมู่" outlined></v-select>
                  </v-col>
                  <v-col cols="4">
                    <v-text-field v-model="searchQuery" label="ค้นหา" outlined></v-text-field>
                  </v-col>
                  <v-col cols="5" class="btn-ss">
                    <v-btn class="btn" color="primary" @click="search">ค้นหา</v-btn>
                    <v-btn color="secondary" @click="clearSearch" class="ml-3">ล้าง</v-btn>
                  </v-col>
                </v-row>
                <v-list>
                  <v-list-item v-for="(item, index) in linkOptions" :key="index" @click="selectLink(item)">
                    <v-list-item-title>{{ item.label }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card-text>
              <v-card-actions>
                <v-btn color="error" @click="pathDialog = false">ยกเลิก</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </v-card-item>
    </v-card>
  </div>
  <br />

  <!-- ตัวแสดงหน้าย่อๆ -->
  <v-card elevation="10" class="withbg">
    <!-- Drop down list ใหม่-->
    <v-list v-model:opened="open">
      <v-list-group v-for="menu in menuTree" :key="menu.id" :value="menu.menuName">
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props">
            <v-icon>{{ isActive ? 'mdi-menu-down' : 'mdi-menu-right' }}</v-icon>
            {{ menu.menuName }}
            <template v-slot:append>
              <v-icon class="mr-1 icon-size" @click.stop="handleAddMenu(menu.id)">mdi-plus</v-icon>

              <v-icon class="mr-1 icon-size" @click.stop="handleEditMenu(menu)">mdi-pencil</v-icon>
              <v-icon class="icon-size" @click.stop="handleDeleteMenu(menu.id)">mdi-delete</v-icon>
            </template>
          </v-list-item>
        </template>

        <!-- If the menu has children, render them in a nested v-list-group -->
        <v-list-group v-if="menu.children && menu.children.length > 0" v-for="child in menu.children" :key="child.id"
          :value="child.menuName">
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" style="color: blue;">
              <v-icon>{{ isActive ? 'mdi-menu-down' : 'mdi-menu-right' }}</v-icon>
              {{ child.menuName }}
              <template v-slot:append>
                <v-icon class="mr-1 icon-size" @click.stop="handleEditMenu(child)">mdi-pencil</v-icon>
                <v-icon class="icon-size" @click.stop="handleDeleteMenu(child.id)">mdi-delete</v-icon>
              </template>
            </v-list-item>
          </template>
        </v-list-group>
      </v-list-group>
    </v-list>
  </v-card>
</template>

<style>
.edit-icon,
.delete-icon {
  cursor: pointer;
  margin-left: 10px;
  color: #333;
}

.edit-icon:hover,
.delete-icon:hover {
  color: red;
}

.breadcrumb-item {
  cursor: pointer;
}

.withbg {
  background-color: #fcfcfc;
}

.buttons-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.custom-dialog {
  max-width: 600px !important;
  width: 90%;
  height: auto;
}

.v-icon {
  cursor: pointer;
}

.custom-path-dialog {
  max-width: 800px !important;
  width: 90%;
  height: 850px !important;
}

.scrollable-content {
  height: 350px;
  /* Adjust this value to fit your design */
  overflow-y: auto;
}

.btn-ss {
  margin-top: -1.6rem;
}

.icon-size {
  font-size: 18px; /* หรือเลือกขนาดที่ต้องการ */
}

.icon-size:hover {
  color: red !important; /* เปลี่ยนสีเมื่อ hover */
  cursor: pointer; /* เปลี่ยน cursor เป็น pointer เมื่อ hover */
}
</style>