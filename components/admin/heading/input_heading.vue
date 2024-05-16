<script setup lang="ts">
// ฟังก์ชันการทำงาน ------------------------------------

// ประกาศ ref สำหรับเก็บ Tag ที่เพิ่มขึ้นมา เริ่มต้นด้วย array ที่ว่างเปล่า
const addTag = () => {
  if (inputText.value.trim() !== '') {
    tags.value.push(inputText.value.trim());
    inputText.value = ''; // Clear input after adding tag
  }
};

const editTag = (index: number) => {
  inputText.value = tags.value[index];
  removeTag(index); // Remove the tag before editing
};

const removeTag = (index: number) => {
  tags.value.splice(index, 1);
};


// การทำ body ส่งไปหาเเม่ ทำ body  ------------------------

// ใช้ defineProps เพื่อรับค่า props จาก component ตัวแม่ โดยระบุชนิดของ props
const props = defineProps({
  name: { type: String, default: '' },
  status: { type: Boolean, default: true },
  day: { type: String, default: '' },
  tag: { type: String, default: '' },
  addTag: { type: String, default: '' },
  editTag: { type: String, default: '' },
  removeTag: { type: String, default: '' },
});

// ใช้ defineEmits เพื่อส่งอีเวนต์ไปยัง component ตัวแม่
const emits = defineEmits(['name', 'status', 'day', 'tag', 'addTag', 'editTag', 'removeTag']); // กำหนด emit ที่ต้องการใช้

const saveName = ref(props.name);
const saveStatus = ref(props.status);
const saveDate = ref(props.day);
const inputText = ref(props.tag);


const tags = ref<string[]>([]);


// ใช้ watch เพื่อตรวจสอบการเปลี่ยนแปลงของข้อมูล
watch(saveName, (newValue) => {
  console.log(newValue)
  // ส่งข้อมูลกลับไปยัง component แม่ เมื่อข้อมูลเปลี่ยนแปลง
  emits('name', newValue);
});

watch(saveStatus, (newValue) => {
  console.log(newValue)
  // ส่งข้อมูลกลับไปยัง component แม่ เมื่อข้อมูลเปลี่ยนแปลง
  emits('status', newValue);
});

watch(saveDate, (newValue) => {
  console.log(newValue)
  emits('day', newValue);
});

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
    <v-card elevation="10" class="withbg center-card" style="max-width: 1000px;">
      <v-card-item class="pa-6">
        <v-row class="mt-1">
          <v-col style="max-width: 500px;">
            <v-text-field label="หัวข้อ" v-model="saveName"></v-text-field>
          </v-col>
          <v-col style="max-width: 350px;">
            <v-text-field label="วันที่สร้าง" v-model="saveDate" class="ml-8 " type="date" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <div class="d-flex flex-column">
              <div class="d-flex align-center">
                <v-text-field type="text" v-model="inputText" label="เพิ่ม Tag ข่าว"
                  style="max-width: 200px;"></v-text-field>
                <v-btn color="primary" class="ml-5 mt-2 align-self-start" v-model="inputText" @click="addTag">
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