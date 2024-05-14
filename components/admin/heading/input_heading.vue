<template>
    <div class="center-container">
        <v-card elevation="10" class="withbg center-card" style="max-width: 1000px;">
            <v-card-item class="pa-6">
                <v-row class="mt-1">
                    <v-col style="max-width: 500px;">
                        <v-text-field label="หัวข้อ"></v-text-field>
                    </v-col>
                    <v-col style="max-width: 350px;">
                        <v-text-field label="วันที่สร้าง" class="ml-8 " type="date" />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <div class="d-flex flex-column">
                            <div class="d-flex align-center">
                                <v-text-field type="text" v-model="inputText" label="เพิ่ม Tag ข่าว"
                                    style="max-width: 200px;"></v-text-field>
                                <v-btn color="primary" class="ml-5 mt-2 align-self-start" @click="addTag">
                                    <v-icon left>mdi-plus</v-icon>
                                </v-btn>
                            </div>
                            <div class="d-flex flex-wrap-reverse">
                                <div v-for="(tag, index) in tags" :key="index" class="tag mr-4 tag-item">
                                    <span @click="editTag(index)" class="editable-tag">{{ tag }}</span>
                                    <span @click="removeTag(index)" class="delete-icon">-</span> <!-- เครื่องหมายลบ -->
                                </div>
                            </div>
                        </div>
                    </v-col>
                    <v-col>
                        <v-row>
                            <span class="ml-4">สถานะ</span>
                            <v-col>
                                <v-switch v-model="status"></v-switch>
                            </v-col>
                        </v-row>
                    </v-col>
                    
                </v-row>
            </v-card-item>
        </v-card>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const status = ref(false);

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