<script setup lang="ts">
import { ref, watch } from 'vue';

//ดึงเข้าดาต้า เเต่ดึงไม่ได้ 
import { createSinglePage } from "~/plugins/api/authService"

const router = useRouter();
const getsave = async () => {
  const data = {
    title: saveName.value,
    status: saveStatus.value,
    day: saveDate.value,
    tag: inputText.value
  };

  try {
    const result = await createSinglePage(data);
    console.log(result);

    if (result.statusCode === 200) {
      router.push('/admin/dashboard');
    } else {
      console.error("Error creating article:", result);
    }
  } catch (error) {
    console.error("Error creating article:", error);
  }
};

// getsave();



// ฟังก์ชันการทำงาน ------------------------------------

// Function to add a tag
const addTag = () => {
  if (inputText.value.trim() !== '') {
    tags.value.push(inputText.value.trim());
    inputText.value = ''; // Clear input after adding tag
  }
};

// Function to edit a tag
const editTag = (index: number) => {
  inputText.value = tags.value[index];
  removeTag(index); // Remove the tag before editing
};

// Function to remove a tag
const removeTag = (index: number) => {
  tags.value.splice(index, 1);
};


// การทำ body ส่งไปหาเเม่ ทำ body  ------------------------

// ใช้ defineProps เพื่อรับค่า props จาก component ตัวแม่ โดยระบุชนิดของ props
const props = defineProps({
  name: { type: String, default: '' },
  status: { type: Boolean, default: true },
  day: { type: String, default: '' },
  tag: { type: Array, default: () => [] },
});

// Define emits
const emits = defineEmits(['name', 'status', 'day', 'tag']);

const saveName = ref(props.name);
const saveStatus = ref(props.status);
const saveDate = ref(props.day);
const inputText = ref(); // Initialize inputText as an empty string
const tags = ref<Array<{ value: string }>>(
  props.tag.map((item: unknown) => ({ value: String(item) }))
);
// Function to add a tag
const addTag = () => {
  if (inputText.value.trim() !== '') {
    const tagValue = inputText.value.trim(); // เก็บค่า inputText ไว้ในตัวแปร tagValue
    tags.value.push({ value: tagValue }); // เพิ่ม tagValue เข้าไปใน tags.value
    inputText.value = ''; // ล้างค่า inputText หลังจากเพิ่ม tag
    emits('tag', tags.value.map(tag => tag.value));
  }
};

const tags = ref<string[]>([]);


// Function to remove a tag
const removeTag = (index: number) => {
  tags.value.splice(index, 1);
  emits('tag', tags.value);
};

// Watch for changes in props
watch(saveName, (newValue) => {
  console.log(newValue);
  emits('name', newValue);
});

watch(saveStatus, (newValue) => {
  console.log(newValue);
  emits('status', newValue);
});

watch(saveDate, (newValue) => {
  console.log(newValue);
  emits('day', newValue);
  // console.log("🚀 ~ watch ~ newValue:", newValue)
});


// Watch for changes in inputText
watch(inputText, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    if (props.addTag !== '') {
      emits('addTag', newValue);
    } else if (props.editTag !== '') {
      emits('editTag', newValue);
    } else {
      emits('tag', newValue);
    }
  }
});



</script>

<template>
  <div class="center-container">
    <v-card elevation="10" class="withbg center-card">
      <v-card-item class="pa-6">
        <v-row class="mt-1">
          <v-col>
            <v-text-field label="หัวข้อ" v-model="saveName" cl></v-text-field>
          </v-col>
          <v-col>
            <v-text-field label="วันที่สร้าง" v-model="saveDate" type="date" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <div class="d-flex flex-column">
              <div class="d-flex align-center">
                <v-text-field type="text" v-model="inputText" label="เพิ่ม Tag"></v-text-field>
                <v-btn color="primary" class="ml-5 mt-2 align-self-start" v-model="inputText" @click="addTag">
                  <v-icon left>mdi-plus</v-icon>
                </v-btn>
              </div>
              <div class="d-flex flex-wrap-reverse">
                <div v-for="(tag, index) in tags" :key="index" class="tag mr-4 tag-item">
                  <span @click="editTag(index)" class="editable-tag">{{ tag }}</span>
                  <span @click="removeTag(index)" class="delete-icon">-</span>
                </div>
              </div>
            </div>
          </v-col>
          <v-col>
            <v-row>
              <span class="ml-4">สถานะ</span>
              <v-col>
                <v-switch v-model="saveStatus"></v-switch>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-item>
    </v-card>
  </div>
</template>

<style>
.tags-container {
  display: flex;
  flex-wrap: wrap;
  /* ระยะห่างระหว่าง tag */
}

.delete-icon {
  cursor: pointer;
  /* เปลี่ยน cursor เป็น pointer เมื่อชี้ที่เครื่องหมายลบ */
  color: #3d7df3;
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
  background-color: #dae7ff;
  color: #3d7df3;
  padding: 0.5rem 0.8rem;
  border-radius: 10px;
  margin-bottom: 8px;
  /* ระยะห่างของ tag ด้านล่าง */
  border: 1px;
  /* เพิ่มเส้นขอบ */
  width: auto;
  /* ปรับขนาดความกว้างอัตโนมัติ */
  height: 25px;
}

span {
  cursor: pointer;
  width: 100%;
}
</style>
