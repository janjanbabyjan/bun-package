<script setup lang="ts">
definePageMeta({
    layout: "admin",
});

const breadcrumbs = [
    { text: 'หน้าแรก', href: '/admin' },
    { text: 'รายชื่อหน้าเว็บไซต์', href: '/admin/content/manage-single-page' },
];

const getBreadcrumbText = (index: number) => {
    return breadcrumbs[index].text;
};


import { ref } from 'vue';
import { productPerformance } from '@/data/dashboard/dashboardData';
const items = ref([
    { title: "Action" },
    { title: "Another action" },
    { title: "Something else here" },
]);

const isOpen = ref(false); // เริ่มต้นเปิดปิด

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
                <v-btn color="primary" class="ml-auto">สร้างหน้าใหม่</v-btn>
            </div>

            <!-- Search inputs -->
            <v-row class="mt-3">
                <v-col cols="12" md="4">
                    <v-text-field label="ค้นหาชื่อ"></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                    <v-select label="สถานะ"></v-select>
                </v-col>
                <v-col cols="12" md="4">
                    <v-select label="ประเภท"></v-select>
                </v-col>
                <v-col cols="12" class="d-flex justify-end align-end mt-n5">
                    <v-btn color="primary" class="mx-2">ค้นหา</v-btn>
                    <v-btn color="error" class="mx-2">ล้าง</v-btn>
                </v-col>
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
                        <v-switch v-model="isOpen" color="primary" class="d-flex align-center"></v-switch>
                    </td>
                    <td class="d-flex align-center">
                        <!-- <h6 class="text-h6 text-right">{{ item.budget }}</h6> -->
                        <v-icon >mdi-pencil</v-icon> <!-- ใช้ไอคอนแก้ไข -->
                    </td>

                </tr>
            </tbody>
        </v-table>
    </v-card>
</template>

<style scoped>
.breadcrumb-item {
    cursor: pointer;
}
</style>
