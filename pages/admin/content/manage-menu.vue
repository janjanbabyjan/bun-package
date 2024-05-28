<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import {
  getAllManageMenus,
  deleteMenu,
  createNewMenu,
  updateMenu,
  getAllPageTypes,
  getAllSinglePages,
} from "@/plugins/api/authService";
import index from "@/components/public/layout/full/vertical-sidebar/NavItem/index.vue";

definePageMeta({
  layout: "admin",
});

interface PageType {
  id: number;
  typeName: string;
}

const selectedPageType = ref<PageType | null>(null);
const category = ref("");

const pageTypes = ref<string[]>([]);

const fetchPageTypes = async () => {
  try {
    const response = await getAllPageTypes();
    pageTypes.value = response.result.map((type: { typeName: string }) => type.typeName);
  } catch (error) {
    console.error("Error fetching page types:", error);
  }
};

const dialog = ref(false);
const pathDialog = ref(false);
const subMenuDialog = ref(false);

const newMenuName = ref("");
const newMenuLink = ref("");
const isActive = ref(false);

const newSubMenuName = ref("");
const newSubMenuLink = ref("");
const isSubMenuActive = ref(false);

const searchQuery = ref("");

const isEditMode = ref(false);
const currentMenuId = ref<number | null>(null);

const isSubMenuEditMode = ref(false);
const currentSubMenuId = ref<number | null>(null);
const selectedParentId = ref<number | string | null>(null);

const manageMenus = ref([]);

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
  pageLink?: string;
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

const filteredPages = computed(() => {
  if (searchQuery.value) {
    return singlePages.value.filter((page) => page.title.includes(searchQuery.value));
  }
  return singlePages.value;
});

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

const openSubMenuDialog = (parentId: number | string) => {
  subMenuDialog.value = true;
  selectedParentId.value = parentId;
};

const closeSubMenuDialog = () => {
  subMenuDialog.value = false;
  newSubMenuName.value = "";
  newSubMenuLink.value = "";
  isSubMenuActive.value = false;
  isSubMenuEditMode.value = false;
  currentSubMenuId.value = null;
};

const saveMenu = async () => {
  try {
    if (isEditMode.value && currentMenuId.value !== null) {
      await updateMenu(currentMenuId.value, {
        menuName: newMenuName.value,
        menuLink: newMenuLink.value,
        isActive: isActive.value,
      });
    } else {
      await createNewMenu(newMenuName.value, newMenuLink.value, isActive.value);
    }
    fetchManageMenus();
    closeDialog();
  } catch (error) {
    console.error("Error saving menu:", error);
  }
};

const saveSubMenu = async () => {
  try {
    if (isSubMenuEditMode.value && currentSubMenuId.value !== null) {
      await updateMenu(currentSubMenuId.value, {
        menuName: newSubMenuName.value,
        menuLink: newSubMenuLink.value,
        isActive: isSubMenuActive.value,
      });
    } else {
      await createNewMenu(newSubMenuName.value, newSubMenuLink.value, isSubMenuActive.value, selectedParentId.value);
    }
    fetchManageMenus();
    closeSubMenuDialog();
  } catch (error) {
    console.error("Error saving submenu:", error);
  }
};

const handleDeleteMenu = async (id: number) => {
  try {
    await deleteMenu(id);
    fetchManageMenus();
  } catch (error) {
    console.error("Error deleting menu:", error);
  }
};

const handleEditMenu = (menu: any) => {
  currentMenuId.value = menu.id;
  newMenuName.value = menu.menuName;
  newMenuLink.value = menu.menuLink;
  isActive.value = menu.isActive;
  isEditMode.value = true;
  dialog.value = true;
};

const handleEditSubMenu = (menu: any) => {
  currentSubMenuId.value = menu.id;
  newSubMenuName.value = menu.menuName;
  newSubMenuLink.value = menu.menuLink;
  isSubMenuActive.value = menu.isActive;
  isSubMenuEditMode.value = true;
  openSubMenuDialog(menu.parentId);
};

const selectLink = (page: SinglePage) => {
  if (page.pageLink) {
    newMenuLink.value = page.pageLink;
  } else {
    newMenuLink.value = ''; // Handle the case where pageLink is undefined
  }
  pathDialog.value = false;
};

const openPathDialog = () => {
  pathDialog.value = true;
};

const clearSearch = () => {
  searchQuery.value = "";
  category.value = "";
};

const search = () => {
  console.log("Search query:", searchQuery.value, "Category:", category.value);
};

const breadcrumbs = [
  { text: "หน้าแรก", href: "/admin" },
  { text: "จัดการเมนู", href: "/admin/content/manage-menu" },
];

const getBreadcrumbText = (index: number) => {
  return breadcrumbs[index].text;
};

onMounted(() => {
  fetchManageMenus();
  fetchPageTypes();
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

  <!-- Main Card -->
  <v-card elevation="10" class="withbg">
    <v-card-item class="pa-6">
      <div class="d-flex align-center justify-space-between pt-sm-2">
        <v-card-title class="text-h5">จัดการเมนู</v-card-title>
        <v-btn color="primary" class="ml-auto" @click="openDialog"
          >เพิ่มเมนูหลัก</v-btn
        >

        <!-- Main Dialog -->
        <v-dialog v-model="dialog" class="custom-dialog">
          <v-card>
            <v-card-title class="mt-2">{{
              isEditMode ? "แก้ไขเมนู" : "เพิ่มเมนู"
            }}</v-card-title>
            <v-card-text>
              <v-text-field
                v-model="newMenuName"
                label="ชื่อเมนู"
                outlined
              ></v-text-field>
              <v-row>
                <v-col cols="10">
                  <v-text-field
                    v-model="newMenuLink"
                    label="ลิงก์"
                    outlined
                    readonly
                    @click="openPathDialog"
                  ></v-text-field>
                </v-col>
                <v-col cols="2">
                  <v-btn color="primary" @click="openPathDialog">เลือก</v-btn>
                </v-col>
              </v-row>
              <v-switch
                v-model="isActive"
                label="แสดงเมนู"
                color="primary"
                :input-value="true"
                :false-value="false"
              ></v-switch>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" @click="saveMenu">{{
                isEditMode ? "บันทึกการเปลี่ยนแปลง" : "เพิ่ม"
              }}</v-btn>
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
          <v-select
            label="Select"
            :items="pageTypes"
            variant="outlined"
          ></v-select>
        </v-col>
        <v-col cols="7">
          <v-text-field
            style="max-width: 350px"
            v-model="searchQuery"
            label="ค้นหา"
            outlined
          ></v-text-field>
        </v-col>
        <v-col
          style="margin-top: -23px"
          cols="2"
          class="d-flex justify-end align-items-center"
        >
          <v-btn class="btn" color="primary" @click="search">ค้นหา</v-btn>
          <v-btn color="secondary" @click="clearSearch" class="ml-3">ล้าง</v-btn>
        </v-col>
      </v-row>

      <v-list>
        <v-list-item
          v-for="page in singlePages"
          :key="page.id"
          @click="selectLink(page)"
        >
          <v-list-item-content>
            <v-list-item-title>{{ page.title }}</v-list-item-title>
            <v-list-item-subtitle v-if="page.pageLink">{{ page.pageLink }}</v-list-item-subtitle>
          </v-list-item-content>
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

  <br />

  <!-- Menu List -->
  <v-card elevation="10" class="withbg">
  <v-list>
    <v-list-group
      v-for="menu in menuTree"
      :key="menu.id"
      :value="menu.menuName"
    >
      <template v-slot:activator="{ props }">
        <v-list-item v-bind="props">
          <v-icon>{{ props.isOpen ? "mdi-menu-down" : "mdi-menu-right" }}</v-icon>
          {{ menu.menuName }}
          <template v-slot:append>
            <v-icon class="icon-size" @click.stop="openSubMenuDialog(menu.id)">mdi-plus</v-icon>
            <v-icon class="mr-1 icon-size" @click.stop="handleEditMenu(menu)">mdi-pencil</v-icon>
            <v-icon class="icon-size" @click.stop="handleDeleteMenu(menu.id)">mdi-delete</v-icon>
          </template>
        </v-list-item>
      </template>

      <!-- Submenu Dialog -->
      <v-dialog v-model="subMenuDialog" class="custom-dialog">
        <v-card>
          <v-card-title class="mt-2">{{ isSubMenuEditMode ? "แก้ไขเมนูย่อย" : "เพิ่มเมนูย่อย" }}</v-card-title>
          <v-card-text>
            <v-text-field v-model="newSubMenuName" label="ชื่อเมนูย่อย" outlined></v-text-field>
            <v-row>
              <v-col cols="10">
                <v-text-field
                  v-model="newSubMenuLink"
                  label="ลิงก์"
                  outlined
                  readonly
                  @click="openPathDialog"
                ></v-text-field>
              </v-col>
              <v-col cols="2">
                <v-btn color="primary" @click="openPathDialog">เลือก</v-btn>
              </v-col>
            </v-row>
            <v-switch v-model="isSubMenuActive" label="แสดงเมนูย่อย" color="primary"></v-switch>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="saveSubMenu">{{ isSubMenuEditMode ? "บันทึกการเปลี่ยนแปลง" : "เพิ่ม" }}</v-btn>
            <v-btn color="error" @click="closeSubMenuDialog">ยกเลิก</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Nested submenus -->
      <v-list-group
        v-if="menu.children && menu.children.length > 0"
        v-for="child in menu.children"
        :key="child.id"
        :value="child.menuName"
      >
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props" style="color: #5b5b5b">
            <v-icon>{{ props.isOpen ? "mdi-menu-down" : "mdi-menu-right" }}</v-icon>
            {{ child.menuName }}
            <template v-slot:append>
              <v-icon class="icon-size" @click.stop="openSubMenuDialog(child.id)">mdi-plus</v-icon>
              <v-icon class="mr-1 icon-size" @click.stop="handleEditMenu(child)">mdi-pencil</v-icon>
              <v-icon class="icon-size" @click.stop="handleDeleteMenu(child.id)">mdi-delete</v-icon>
            </template>
          </v-list-item>
        </template>
        
        <!-- Display page.title under the submenu -->
        <v-list-item
          v-for="page in child.pages"
          :key="page.id"
          @click="navigateTo(page.link)"
        >
          <v-list-item-content>
            <v-list-item-title>{{ page.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list-group>
      
      <!-- Display page.title under the main menu -->
      <v-list-item
        v-for="page in menu.pages"
        :key="page.id"
        @click="navigateTo(page.link)"
      >
        <v-list-item-content>
          <v-list-item-title>{{ page.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

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
  font-size: 18px;
  /* หรือเลือกขนาดที่ต้องการ */
}

.icon-size:hover {
  color: red !important;
  /* เปลี่ยนสีเมื่อ hover */
  cursor: pointer;
  /* เปลี่ยน cursor เป็น pointer เมื่อ hover */
}
</style>
