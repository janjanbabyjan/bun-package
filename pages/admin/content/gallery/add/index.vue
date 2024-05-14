<script setup lang="ts">

definePageMeta({
  layout: "admin",
});

// ปุ่มบันทึก
const getsave = () => {
  
};


// ตัวบอกหน้า
const breadcrumbs = [
  { text: 'หน้าแรก', href: '/admin' },
  { text: 'รายชื่อหน้าเว็บไซต์', href: '/admin/content/manage-single-page' },
  { text: 'เพิ่มรูป', href: '/admin/content/gallery/add' },
];

const getBreadcrumbText = (index: number) => {
  return breadcrumbs[index].text;
};

// ปุ่มเปิดปิด
const isOpen = ref(false); // เริ่มต้นเปิดให้เป็น false

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

// รูป
const imageUrl = ref<string>(''); // เก็บ URL ของรูปที่อัปโหลด
const fileInput = ref<HTMLInputElement | null>(null);

// Function to handle file upload
const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        imageUrl.value = reader.result;
      }
    };
    reader.readAsDataURL(file);
  } else {
    alert('โปรดเลือกไฟล์รูปภาพเท่านั้น');
  }
};

// Compute the style for the content area background
const contentAreaStyle = ref({
  backgroundImage: `url(${imageUrl.value})`,
  width: '100%',
  height: '300px', // Set the desired height here
});

// Update content area style when imageUrl changes
watchEffect(() => {
  contentAreaStyle.value.backgroundImage = `url(${imageUrl.value})`;
});


const saveImage = () => {
  // บันทึกรูปภาพได้ที่ imageUrl.value
  // ตัวอย่างการบันทึกรูปภาพ: axios.post('/upload', { image: imageUrl.value })
};

// วันที่
const dialog = ref(false); // ตัวแปรสำหรับการเปิดปิด dialog
const selectedDate = ref(null); // ตัวแปรสำหรับเก็บวันที่ที่เลือก

const openDialog = () => {
  dialog.value = true; // เปิด dialog เมื่อกดปุ่ม
};

const saveDate = () => {
  // บันทึกวันที่ที่เลือกไว้ใน selectedDate
  selectedDate.value = selectedDate.value;
  // ปิด dialog เมื่อกดปุ่ม "บันทึก"
  dialog.value = false;
};

const closeDialog = () => {
  // ปิด dialog เมื่อกดปุ่ม "ยกเลิก"
  dialog.value = false;
};

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

    <div class="center-container">
      <v-card elevation="10" class="withbg center-card" style="max-width: 1000px;">
        <v-card-item class="pa-6">
          <v-row class="mt-2">
            <v-col cols="12" md="4" style="max-width: 500px;">
              <v-text-field label="หัวข้อ"></v-text-field>
              <input type = "date" />
              
              <!-- Switch and content to the right -->
              <div class="d-flex align-center justify-between">
                <!-- ปุ่มเพื่อเปิด -->
                <v-switch id="isOpenSwitch" v-model="isOpen" class="ml-3 d-flex custom-switch"
                  label="เปิด/ปิด"></v-switch>
              </div>

            </v-col>

            <div>
              <v-btn color="primary" class="ml-auto mt-4" @click="openDialog">เลือกวันที่</v-btn>

              <!-- Content below the button -->
              <div v-if="selectedDate" class="text-center mt-2">
                <p>วันที่เลือก: {{ selectedDate }}</p>
              </div>

              <v-dialog v-model="dialog" max-width="350px" hide-overlay overlay-color="transparent">
                <v-card>
                  <v-container>
                    <v-row justify="center">
                      <v-date-picker elevation="12" v-model="selectedDate" width="350px"></v-date-picker>
                      <!-- ลดขนาดโดยกำหนด width -->
                    </v-row>
                  </v-container>
                  <v-card-actions>
                    <v-btn color="primary" @click="saveDate">บันทึก</v-btn>
                    <v-btn @click="closeDialog">ยกเลิก</v-btn>
                  </v-card-actions>
                </v-card>
                <div v-if="selectedDate" class="text-center mt-2"> <!-- Added text-center and mt-2 for styling -->
                  <p>วันที่เลือก: {{ selectedDate }}</p>
                </div>
              </v-dialog>
            </div>
          </v-row>
        </v-card-item>
      </v-card>
    </div>

    <div class="center-container">
      <v-card class="withbg mt-4 " style="max-width: 1000px;">
        <div class="title-section">
          <v-card-title class="text-h5 ml-3">เพิ่ม Tag ข่าว</v-card-title>
        </div>
        <!-- Content to the right of the switch -->
        <div class="d-flex flex-column ml-7 mb-5 ">
          <div class="d-flex align-center">
            <v-text-field type="text" v-model="inputText" label="เพิ่มข้อความ" style="max-width: 300px;"></v-text-field>
            <v-btn color="primary" class="ml-3 mt-1 align-self-start" @click="addTag">
              <v-icon left>mdi-plus</v-icon>
              เพิ่ม
            </v-btn>
          </div>
          <div class="d-flex flex-wrap-reverse">
            <div v-for="(tag, index) in tags" :key="index" class="tag mr-2">{{ tag }}</div>
          </div>
        </div>
      </v-card>
    </div>

    <div class="center-container">
      <v-card class="withbg mt-4" style="max-width: 1000px;">
        <div class="title-section">
          <v-card-title class="text-h5 ml-3">เพิ่มรูป</v-card-title>
        </div>
        <!-- Content area -->
        <div class="content-area" :style="contentAreaStyle">
          <input type="file" @change="handleFileUpload" accept="image/*">
        </div>

        <!-- <div class="image-container">
          <div class="image-frame">
            <img :src="imageUrl" alt="Uploaded Image" v-if="imageUrl" class="image-preview">
          </div>
        </div> -->

        <v-btn color="primary" class="ml-5 mb-6" @click="saveImage">บันทึก</v-btn>
      </v-card>
    </div>

  </div>

</template>

<style scoped>
.breadcrumb-item {
  cursor: pointer;
}

.description {
  text-align: center;
  margin-top: 20px;
}


.title-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 8px;
  padding-left: 10px;
  padding-right: 10px;
  margin-bottom: 10px;
}

.center-container {
  display: flex;
  justify-content: center;
  align-items: center;

}

.content-area {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  /* กำหนดขอบให้เป็นสี่เหลี่ยม */
  max-width: 90%;
  margin-left: 35px;
  background-size: contain;
  /* แสดงตามสัดส่วนจริงของรูปภาพ */
  background-position: center;
  background-repeat: no-repeat;
  /* ป้องกันการทำซ้ำของรูปภาพ */
}

.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-frame {
  border: 2px solid #ccc;
  padding: 10px;
}

.image-preview {
  max-width: 100%;
  max-height: 100%;
}
</style>
