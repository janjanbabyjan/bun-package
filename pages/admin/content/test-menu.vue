<script setup lang="ts">

definePageMeta({
    layout: "admin",
});
import Swal from "sweetalert2";
import { onMounted } from 'vue';
import {
    getAllManageMenus,
    updateMenu,
    createNewMenu,
    getAllPageTypes,
    getAllSinglePages,
    deleteMenu,

} from '@/plugins/api/authService'; //ดึง getAllManageMenus 

interface ManageMenu { //ตัวเมนู
    id: number;
    name: string;
    children: ManageMenu[];
}

const manageMenus = ref<ManageMenu[]>([]);  //ประกาศตัวแปล ของตัวเมนู

const fetchManageMenus = async () => { //เรียกใช้มั้ง ของตัวเมนู
    try {
        const response = await getAllManageMenus();
        manageMenus.value = response.result;
        console.log("🚀 ~ fetchManageMenus ~ manageMenus.value:", manageMenus.value)
        console.log("🚀 ~ fetchManageMenus ~ response:", response)
        console.log("🚀 ~ fetchManageMenus ~ response:", response.result)
    } catch (error) {
        console.error("Error fetching manage menus:", error);
    }
};

onMounted(() => { //เรียกใช้มั้ง ของตัวเมนู
    fetchManageMenus();
    fetchPageTypes();
    fetchSinglePages();

});

// ตัวบอกหน้าด้านบน
const breadcrumbs = [
    { text: "หน้าแรก", href: "/admin" },
    { text: "จัดการเมนู", href: "/admin/content/manage-menu" },
];

const getBreadcrumbText = (index: number) => {
    return breadcrumbs[index].text;
};

// เปิด dialog สร้างเมนู 1
const dialog = ref(false);
const openDialog = () => {
    dialog.value = true;
};

//ประกาศตัวแปรของ Dialog 1
const newMenuName = ref("");
const newMenuLink = ref("");
const isActive = ref(false);
const isEditMode = ref(false);
const currentMenuId = ref<number | null>(null);
const selectedParentId = ref<number | string | null>(null);


// ปิดปุ่มยกเลิก ตัวที่ 1 
const closeDialog = () => {

    subMenuName.value = '';

    dialog.value = false;
    newMenuName.value = "";
    newMenuLink.value = "";
    isActive.value = false;
    isEditMode.value = false;
    currentMenuId.value = null;
};

// save ข้อมูล บันทึกตัวที่ 1 
const saveMenu = async () => {
    try {
        if (isEditMode.value && currentMenuId.value !== null) {
            await updateMenu(currentMenuId.value, {
                menuName: newMenuName.value,
                pathMenu: newMenuLink.value,
                isActive: isActive.value,
                parentId: selectedParentId.value, // ใช้ parentId จาก selectedParentId
            });
        } else {
            await createNewMenu(
                newMenuName.value,
                newMenuLink.value,
                isActive.value,
                selectedParentId.value // ใช้ parentId จาก selectedParentId
            );
        }
        fetchManageMenus();
        closeDialog();
    } catch (error) {
        console.error("Error saving menu:", error);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Error saving menu!",
            footer: '<a href="#">Why do I have this issue?</a>',
        });
    }
};

// เปืดเลือก path ของตัว 1
const pathDialog = ref(false);

const openPathDialog = () => {
    pathDialog.value = true;
};

// เลือก path ของตัว 1
const pageTypes = ref<string[]>([]);
const searchQuery = ref("");
const category = ref("");

// clearSearch
const clearSearch = () => {
    searchQuery.value = "";
    category.value = "";
};

// search path ของตัว 1
const search = () => {
    console.log("Search query:", searchQuery.value, "Category:", category.value);
};

// เรียก type ของหน้า ของ path ของตัว 1
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

// เรียก path ของตัว 1 มาแสดง
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
        return singlePages.value.filter((page) =>
            page.title.includes(searchQuery.value)
        );
    }
    return singlePages.value;
});


// เลือก Link เเล้วไปโชว์ในช่องจอง 1 
const newSubMenuLink = ref("");
const subMenuDialog = ref(false);

const selectLink = (page: SinglePage) => {
    if (page.pageLink) {
        // ตรวจสอบว่ามาจาก dialog ของเมนูหลักหรือเมนูย่อย
        if (subMenuDialog.value) {
            newSubMenuLink.value = page.pageLink;
        } else {
            newMenuLink.value = page.pageLink;
        }
    } else {
        if (subMenuDialog.value) {
            newSubMenuLink.value = "";
        } else {
            newMenuLink.value = "";
        }
    }
    pathDialog.value = false;
};

// ฟังก์ชันลบ
const handleDeleteMenu = async (id: number, parentId?: number) => {
    try {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
            await deleteMenu(id);
            fetchManageMenus();
            Swal.fire("Deleted!", "The menu has been deleted.", "success");
            if (parentId) {
                const parentMenu = manageMenus.value.find(menu => menu.id === parentId);
                if (parentMenu) {
                    parentMenu.children = parentMenu.children.filter(menu => menu.id !== id);
                    // ตรวจสอบและลบ subMenu และ subSubMenu ด้วย
                    parentMenu.children.forEach(subMenu => {
                        subMenu.children = subMenu.children.filter(sub => sub.id !== id);
                        subMenu.children.forEach(subSubMenu => {
                            subSubMenu.children = subSubMenu.children.filter(sub => sub.id !== id);
                        });
                    });
                }
            } else {
                // ลบ mainMenu และ subMenu และ subSubMenu ที่เกี่ยวข้อง
                manageMenus.value = manageMenus.value.filter(menu => {
                    if (menu.id === id) return false;
                    menu.children = menu.children.filter(sub => sub.id !== id);
                    menu.children.forEach(subMenu => {
                        subMenu.children = subMenu.children.filter(sub => sub.id !== id);
                    });
                    return true;
                });
            }
        }
    } catch (error) {
        console.error("Error deleting menu:", error);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Error deleting menu!",
            footer: '<a href="#">Why do I have this issue?</a>',
        });
    }
};


//สร้าง SubMenuDialog ตัวที่ 2
const subMenuName = ref('');
const newSubMenuName = ref("");
const isSubMenuActive = ref(false);
const isSubMenuEditMode = ref(false);
const currentSubMenuId = ref<number | null>(null);

//open SubMenuDialog ตัวที่ 2
const openSubMenuDialog = (parentId: number | string) => {
    subMenuDialog.value = true;
    selectedParentId.value = parentId;
    newSubMenuName.value = "";
    newSubMenuLink.value = "";
    isSubMenuActive.value = false;
    isSubMenuEditMode.value = false;
    currentSubMenuId.value = null;
};

//close SubMenuDialog ตัวที่ 2
const closeSubMenuDialog = () => {
    subMenuDialog.value = false;
    newSubMenuName.value = "";
    newSubMenuLink.value = "";
    isSubMenuActive.value = false;
    isSubMenuEditMode.value = false;
    currentSubMenuId.value = null;
};

//save SubMenuDialog ตัวที่ 2 คือตัวที่ 1 สร้าง 2
const saveSubMenu = async () => {
    try {
        if (isSubMenuEditMode.value && currentSubMenuId.value !== null) {
            await updateMenu(currentSubMenuId.value, {
                menuName: newSubMenuName.value,
                pathMenu: newSubMenuLink.value,
                isActive: isSubMenuActive.value,
                parentId: selectedParentId.value, // ใช้ parentId จาก selectedParentId
            });
        } else {
            await createNewMenu(
                newSubMenuName.value,
                newSubMenuLink.value,
                isSubMenuActive.value,
                selectedParentId.value // ใช้ parentId จาก selectedParentId
            );
        }
        fetchManageMenus();
        closeSubMenuDialog();
    } catch (error) {
        console.error("Error saving submenu:", error);
    }
};


</script>


<template>
    <div>
        <h1>Manage Menus</h1>
        <ul>
            <template v-for="(mainMenu) in manageMenus" :key="mainMenu.id">
                <li>
                    {{ mainMenu.name }}
                    <template v-if="mainMenu.children && mainMenu.children.length">
                        <ul> <!--{{ mainMenu.children }} -->
                            <template v-for="subMenu in mainMenu.children" :key="subMenu.id">
                                <li>
                                    {{ subMenu.name }}
                                    <template v-if="subMenu.children && subMenu.children.length">
                                        <ul>
                                            <li v-for="subSubMenu in subMenu.children" :key="subSubMenu.id">
                                                {{ subSubMenu.name }}
                                            </li>
                                        </ul>
                                    </template>
                                </li>
                            </template>
                        </ul>
                    </template>
                </li>
            </template>
        </ul>
    </div>


    <!-- ตัวบอกหน้า -->
    <v-breadcrumbs>
        <v-breadcrumbs-item v-for="(breadcrumb, index) in breadcrumbs" :key="index" @click="navigateTo(breadcrumb.href)"
            class="breadcrumb-item">
            {{ getBreadcrumbText(index) }}
            <template v-if="index < breadcrumbs.length - 1"> > </template>
        </v-breadcrumbs-item>
    </v-breadcrumbs>

    <!-- Main Card -->
    <v-card elevation="10" class="withbg">
        <v-card-item class="pa-6">
            <div class="d-flex align-center justify-space-between pt-sm-2">
                <v-card-title class="text-h5">จัดการเมนู</v-card-title>
                <v-btn color="primary" class="ml-auto" @click="openDialog">เพิ่มเมนูหลัก</v-btn>

                <!-- Dialog ตัวที่ 1 -->
                <v-dialog v-model="dialog" class="custom-dialog">
                    <v-card>
                        <v-card-title class="mt-2">{{
                            isEditMode ? "แก้ไขเมนู" : "เพิ่มเมนู"
                            }}</v-card-title>
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
                            <v-switch v-model="isActive" label="แสดงเมนู" color="primary"></v-switch>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn color="primary" @click="saveMenu">{{
                                isEditMode ? "บันทึกการเปลี่ยนแปลง" : "เพิ่ม"
                                }}</v-btn>
                            <v-btn color="error" @click="closeDialog">ยกเลิก</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

                <!-- dialog เลือกpath  -->
                <v-dialog v-model="pathDialog" class="custom-path-dialog align-center">
                    <v-card>
                        <v-card-title class="mt-2">เลือกเส้นทาง </v-card-title>
                        <v-card-text class="scrollable-content">
                            <v-row class="align-center">
                                <v-col cols="3">
                                    <v-select label="Select" :items="pageTypes" variant="outlined"></v-select>
                                </v-col>
                                <v-col cols="7">
                                    <v-text-field style="max-width: 350px" v-model="searchQuery" label="ค้นหา"
                                        outlined></v-text-field>
                                </v-col>
                                <v-col style="margin-top: -23px" cols="2" class="d-flex justify-end align-items-center">
                                    <v-btn class="btn" color="primary" @click="search">ค้นหา</v-btn>
                                    <v-btn color="secondary" @click="clearSearch" class="ml-3">ล้าง</v-btn>
                                </v-col>
                            </v-row>
                            <v-list>
                                <v-list-item v-for="page in filteredPages" :key="page.id" @click="selectLink(page)">
                                    <v-list-item-content>
                                        <v-list-item-title>{{ page.title }}</v-list-item-title>
                                        <v-list-item-subtitle v-if="page.pageLink">{{
                                            page.pageLink
                                            }}</v-list-item-subtitle>
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

    <!-- ตัวแสดงเมนูที่สร้างทั้งหมด -->
    <v-card elevation="10" class="withbg">

        <v-list v-for="mainMenu in manageMenus" :key="mainMenu.id">
            <v-list-group>
                <template v-slot:activator="{ props }">
                    <v-list-item v-bind="props">
                        <v-icon>{{ props.isOpen ? "mdi-menu-down" : "mdi-menu-right" }}</v-icon>
                        {{ mainMenu.name }}
                        <template v-slot:append>
                            <v-icon class="icon-size" @click.stop="openSubMenuDialog(mainMenu.id)">mdi-plus</v-icon>
                            <v-icon class="mr-1 icon-size" @click.stop="handleEditMenu(child)">mdi-pencil</v-icon>
                            <v-icon class="icon-size" @click.stop="handleDeleteMenu(mainMenu.id)">mdi-delete</v-icon>
                        </template>
                    </v-list-item>
                </template>

                <v-list-group v-for="subMenu in mainMenu.children" :key="subMenu.id"
                    v-if="mainMenu.children && mainMenu.children.length">
                    <template v-slot:activator="{ props }">
                        <v-list-item v-bind="props" style="color: #5b5b5b">
                            <v-icon>{{ props.isOpen ? "mdi-menu-down" : "mdi-menu-right" }}</v-icon>
                            {{ subMenu.name }}
                            <template v-slot:append>
                                <v-icon class="icon-size" @click.stop="openSubMenuDialog(subMenu.id)">mdi-plus</v-icon>
                                <!-- <v-icon class="mr-1 icon-size"@click.stop="handleEditSubMenu(subMenu)">mdi-pencil</v-icon> -->
                                <v-icon class="icon-size" @click.stop="handleDeleteMenu(subMenu.id)">mdi-delete</v-icon>
                            </template>

                        </v-list-item>
                    </template>

                    <v-list-group v-for="subSubMenu in subMenu.children" :key="subSubMenu.id"
                        v-if="subMenu.children && subMenu.children.length">
                        <template v-slot:activator="{ props }">
                            <v-list-item v-bind="props" style="color: #5b5b5b">
                                <v-icon>{{ props.isOpen ? "mdi-menu-down" : "mdi-menu-right" }}</v-icon>
                                {{ subSubMenu.name }}
                                <template v-slot:append>
                                    <v-btn text @click.stop="handleEditSubSubMenu(subSubMenu)">
                                        <v-icon class="mr-1 icon-size">mdi-pencil</v-icon> แก้ไข
                                    </v-btn>
                                    <v-icon class="icon-size"
                                        @click.stop="handleDeleteMenu(subMenu.id)">mdi-delete</v-icon>
                                </template>
                            </v-list-item>
                        </template>
                    </v-list-group>
                </v-list-group>
            </v-list-group>
        </v-list>
    </v-card>

    <!-- dialog สร้างย่อยของ 1  -->
    <v-dialog v-model="subMenuDialog" class="custom-dialog">
        <v-card>
            <v-card-title class="mt-2">{{
                isSubMenuEditMode ? " แก้ไขเมนูย่อย " : " เพิ่มเมนูย่อย "
                }}</v-card-title>
            <v-card-text>
                <v-text-field v-model="newSubMenuName" label="ชื่อเมนูย่อยที่ " outlined></v-text-field>
                <v-row>
                    <v-col cols="10">
                        <v-text-field v-model="newSubMenuLink" label="ลิงก์" outlined readonly
                            @click="openPathDialog"></v-text-field>
                    </v-col>
                    <v-col cols="2">
                        <v-btn color="primary" @click="openPathDialog">เลือก</v-btn>
                    </v-col>
                </v-row>
                <v-switch v-model="isSubMenuActive" label="แสดงเมนูย่อย" color="primary"></v-switch>
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" @click="saveSubMenu">{{
                    isSubMenuEditMode ? "บันทึกการเปลี่ยนแปลง" : "เพิ่ม"
                    }}</v-btn>
                <v-btn color="error" @click="closeSubMenuDialog">ยกเลิก</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>


</template>


<style>
.custom-dialog {
    max-width: 600px !important;
    width: 90%;
    height: auto;
}

.scrollable-content {
    height: 350px;
    /* Adjust this value to fit your design */
    overflow-y: auto;
}

.custom-path-dialog {
    max-width: 800px !important;
    width: 90%;
    height: 850px !important;
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