<script setup lang="ts">
definePageMeta({
    layout: "admin",
});

// ตัวบอกหน้า
const breadcrumbs = [
    { text: 'หน้าแรก', href: '/admin' },
    { text: 'รายชื่อหน้าเว็บไซต์', href: '/admin/content/manage-single-page' },
];

const getBreadcrumbText = (index: number) => {
    return breadcrumbs[index].text;
};

import { ref } from 'vue';
import { productPerformance } from '@/data/dashboard/dashboardData';

const isOpen = ref(false); // เริ่มต้นเปิดปิด

// ตัวป๊อปอัพ
const dialog = ref(false);

const openDialog = () => {
    dialog.value = true;
};
const closeDialog = () => {
    dialog.value = false;
};
</script>


<template>
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
                <v-card-title class="text-h5">รายชื่อหน้าเว็บไซต์</v-card-title>
                <!-- Move the Create Page button to the right -->
                <v-btn color="primary" class="ml-auto" @click="openDialog">สร้าง Content ใหม่</v-btn>
                <v-dialog v-model="dialog" max-width="500px">
                    <v-card cols>
                        <v-card-title class="mt-2">เลือกสร้าง Content</v-card-title>
                        <v-card-text>
                            <div class="buttons-container">
                                <router-link to="/admin/content/article/add">
                                    <v-btn color="primary" class="ml-5"
                                       >เพิ่มคำบรรยาย</v-btn>
                                </router-link>
                                <router-link to="/admin/content/gallery/add">
                                    <v-btn color="primary" class="ml-5"
                                       >เพิ่มรูป</v-btn>
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
                <v-col cols="12" md="4" style="max-width: 200px;">
                    <v-text-field label="ค้นหาชื่อ"></v-text-field>
                </v-col>
                <v-col cols="12" md="4" style="max-width: 200px;">
                    <v-select label="สถานะ"></v-select>
                </v-col>
                <v-col cols="12" md="4" class="d-flex justify-between align-center" style="max-width: 200px;">
                    <v-select label="ประเภท"></v-select>
                </v-col>
                <div class="d-flex justify-between align-center" style="margin-top: -5px;">
                    <v-btn color="primary" class="ml-3">ค้นหา</v-btn>
                    <v-btn color="error" class="ml-3">ล้าง</v-btn>
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
                <tr v-for="item in productPerformance" :key="item.name" class="month-item">
                    <td>
                        <p class="text-15 font-weight-medium">{{ item.id }}</p>
                    </td>
                    <td>
                        <div class="">
                            <h6 class="text-subtitle-1 font-weight-bold">{{ item.name }}</h6>
                            <div class="text-subtitle-2 mt-1 text-muted">{{ item.post }}</div>
                        </div>
                    </td>
                    <td>
                        <h6 class="text-body-1 text-muted">{{ item.pname }}</h6>
                    </td>
                    <td>
                        <!-- <v-chip :class="'text-body-2 bg-' + item.statuscolor" color="white" size="small">{{
                            item.status
                        }}</v-chip> -->
                        <v-switch id="isOpenSwitch" v-model="isOpen" class="d-flex custom-switch"></v-switch>
                    </td>
                    <td>
                        <router-link to="/admin/content/article/edit/[id]">
                            <v-icon class="ml-3" style="color: red;">mdi-pencil</v-icon>
                        </router-link>
                        <!-- <h6 class="text-h6 text-right">{{ item.budget }}</h6> -->
                        <!-- ใช้ไอคอนแก้ไข -->
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
    /* จัดวางตรงกลางแนวนอน */
    align-items: center;
    /* จัดวางตรงกลางแนวตั้ง */
    height: 100%;
    /* กำหนดความสูงเท่ากับพอกับปุ่ม */
}
</style>
