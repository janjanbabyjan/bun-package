<template>
    <div class="center-container">
        <v-card class="withbg mt-4 " style="max-width: 1000px;">
            <div class="title-section mt-3">
                <v-card-title class="text-h5 ml-3">เพิ่ม Tag ข่าว</v-card-title>
            </div>
            <!-- Content to the right of the switch -->
            <div class="d-flex flex-column ml-7 mb-5 ">
                <div class="d-flex align-center">
                    <v-text-field type="text" v-model="inputText" label="เพิ่มข้อความ"
                        style="max-width: 300px;"></v-text-field>
                    <v-btn color="primary" class="ml-3 mt-1 align-self-start" @click="addTag">
                        <v-icon left>mdi-plus</v-icon>
                        เพิ่ม
                    </v-btn>
                </div>
                <div class="d-flex flex-wrap-reverse">
                    <div v-for="(tag, index) in tags" :key="index" class="tag mr-4 tag-item">
                        <span @click="editTag(index)" class="editable-tag">{{ tag }}</span>
                        <span @click="removeTag(index)" class="delete-icon">-</span> <!-- เครื่องหมายลบ -->
                    </div>
                </div>
            </div>
        </v-card>
    </div>

</template>

<script setup lang="ts">
import { ref } from 'vue';

// ประกาศ ref สำหรับเก็บข้อความที่ผู้ใช้ป้อน
const inputText = ref<string>('');

// ประกาศ ref สำหรับเก็บ Tag ที่เพิ่มขึ้นมา
const tags = ref<string[]>([]);

const addTag = () => {
    if (inputText.value.trim() !== '') {
        tags.value.push(inputText.value.trim());
        inputText.value = '';
    }
};

const editTag = (index: number) => {
    inputText.value = tags.value[index];
    removeTag(index);
};

const removeTag = (index: number) => {
    tags.value.splice(index, 1);
};
</script>

<style>
.tags-container {
    display: flex;
    flex-wrap: wrap;
    gap: 50px;
    /* ระยะห่างระหว่าง tag */
}

.delete-icon {
    cursor: pointer;
    /* เปลี่ยน cursor เป็น pointer เมื่อชี้ที่เครื่องหมายลบ */
    color: black;
    /* กำหนดสีของเครื่องหมายลบเป็นสีดำ */
    font-size: 1.5rem;
    /* กำหนดขนาดของเครื่องหมายลบใหญ่ขึ้น */
    margin-left: 4px;
    /* กำหนดระยะห่างของเครื่องหมายลบจากข้อความ */
}

.tag-item {
    display: inline-flex;
    font-size: 12px;
    align-items: center;
    background-color: #d1d1d1;
    padding: 1px 4px;
    border-radius: 15px;
    margin-bottom: 8px;
    /* ระยะห่างของ tag ด้านล่าง */
    border: 1px;
    /* เพิ่มเส้นขอบ */
    width: auto;
    /* ปรับขนาดความกว้างอัตโนมัติ */
    height: 25px;
}

.editable-tag {
  cursor: pointer;
  /* เปลี่ยน cursor เป็น pointer เมื่อชี้ที่แท็กที่สามารถแก้ไขได้ */
}

</style>