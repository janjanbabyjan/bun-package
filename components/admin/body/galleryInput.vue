<template>
    <div class="center-container">
        <v-card class="withbg mt-4" style="max-width: 1000px;">
            <div class="title-section">
                <v-card-title class="text-h5 ml-3">เพิ่มรูป</v-card-title>
            </div>
            <!-- Content area -->
            <div class="content-area">
                <!-- Camera icon and file input -->
                <v-icon color="primary" @click="openFileInput">mdi-camera</v-icon>
                <input ref="fileInput" type="file" style="display: none;" @change="handleFileUpload" accept="image/*">
                <!-- Gallery display -->
                <div class="image-gallery">
                    <div v-for="(imageUrl, index) in imageUrls" :key="index" class="image-container">
                        <img :src="imageUrl" class="gallery-image" alt="Image" @click="openDialog(imageUrl)">
                        <v-icon class="delete-icon" @click="deleteImage(index)">mdi-close-circle</v-icon>
                    </div>
                </div>
            </div>
            <!-- Dialog for selected image -->
            <v-dialog v-model="dialog" max-width="800px" content-class="popup-dialog">
                <img :src="selectedImageUrl" alt="Selected Image" class="popup-image">
            </v-dialog>
            <v-btn color="primary" class="ml-5 mb-6" @click="saveImages">บันทึก</v-btn>
        </v-card>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const imageUrl = ref<string>('');
const imageUrls = ref<string[]>([]);
const selectedImageUrl = ref<string>('');
const dialog = ref<boolean>(false);

const fileInput = ref<HTMLInputElement | null>(null);

const openFileInput = () => {
    if (fileInput.value) {
        fileInput.value.click();
    }
};

const handleFileUpload = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
            if (typeof reader.result === 'string') {
                imageUrl.value = reader.result;
                imageUrls.value.push(reader.result);
            }
        };
        reader.readAsDataURL(file);
    } else {
        alert('โปรดเลือกไฟล์รูปภาพเท่านั้น');
    }
};

const openDialog = (imageUrl: string) => {
    selectedImageUrl.value = imageUrl;
    dialog.value = true;
};

const deleteImage = (index: number) => {
    imageUrls.value.splice(index, 1);
};

const saveImages = () => {
    // บันทึกรูปภาพได้ที่ imageUrl.value
    // ตัวอย่างการบันทึกรูปภาพ: axios.post('/upload', { image: imageUrl.value })
};
</script>

<style scoped>
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
    max-width: 90%;
    margin-left: 35px;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
}

.image-gallery {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.gallery-image {
    width: 100px;
    height: 100px;
    object-fit: cover;
    cursor: pointer;
}

.image-container {
    position: relative;
    display: inline-block;
}

.delete-icon {
    position: absolute;
    top: -10px;
    right: -10px;
    cursor: pointer;
    color: red;
}

/* Style for the dialog */
.popup-image {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
}
</style>
