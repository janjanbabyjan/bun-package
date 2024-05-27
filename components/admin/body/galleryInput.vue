<!-- components\admin\body\galleryInput.vue -->
<script setup lang="ts">
import { ref } from 'vue';
import { defineEmits } from 'vue';
import axios from 'axios';

const imageUrl = ref<string>('');
const imageUrls = ref<string[]>([]);
const selectedImageUrl = ref<string>('');
const dialog = ref<boolean>(false);
const fileInput = ref<HTMLInputElement | null>(null);
const emit = defineEmits(['imageUploaded']);
const previewImageUrl = ref<string>('');
const uploadedFilePaths: any[] = [];

const openFileInput = () => {
    if (fileInput.value) {
        fileInput.value.click();
    }
};

const handleFileUpload = async (event: any) => {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    imageUrls.value = [];
    if (files) {
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i]);
        }
        try {
            const response = await axios.post('http://localhost:8000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status === 201) {
                const uploadedFiles = response.data.file;
                console.log(uploadedFiles)
                uploadedFiles.forEach((file: any) => uploadedFilePaths.push(file.path));

                // Emit the imageUploaded event with the uploaded file paths
                emit('imageUploaded', uploadedFilePaths);
                for (let i = 0; i < files.length; i++) {
                    if (files[i].type.startsWith('image/')) {
                        const previewUrl = URL.createObjectURL(files[i]);
                        imageUrls.value.push(previewUrl);
                    } else {
                        console.error('Upload failed:', response.data.message);
                    }
                }
            } else {
                console.error('Upload failed:', response.data.message);
            }
        } catch (error) {
            console.error('Error uploading files:', error);
        }
    }
};

const openDialog = (imageUrl: string) => {
    selectedImageUrl.value = imageUrl;
    dialog.value = true;
};

const deleteImage = (index: number) => {
    imageUrls.value.splice(index, 1);
};
</script>

<template>
    <div class="center-container">
        <div class="title-section">
            <v-card-title class="text-h5 ml-3">เพิ่มรูป</v-card-title>
        </div>
        <div class="content-area">
            <input ref="fileInput" type="file" multiple style="display: none;" @change="handleFileUpload"
                accept="image/*">
            <div class="image-gallery">
                <div v-for="(imageUrl, index) in imageUrls" :key="index" class="image-container">
                    <img :src="imageUrl" class="gallery-image" alt="Image" @click="openDialog(imageUrl)">
                    <v-icon class="delete-icon" @click="deleteImage(index)">mdi-close-circle</v-icon>
                </div>
            </div>
            <v-icon color="primary" class="icon-camera" @click="openFileInput">mdi-camera</v-icon>
        </div>
        <v-dialog v-model="dialog" max-width="800px" content-class="popup-dialog">
            <img :src="selectedImageUrl" alt="Preview Image" class="popup-image" />
        </v-dialog>
    </div>
</template>




<style scoped>
.center-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
}

.icon-camera {
    border: 1px solid #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    /* ปรับขนาดของไอค่อนตามต้องการ */
    height: 100px;
    margin-top: -5px;
    margin-left: 10px;
    /* ระยะห่างของไอคอนกล้องกับรูปภาพ */
}

.content-area {
    border: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 4px;
    width: 95%;
    /* margin-left: 35px; */
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    /* จัดให้รูปภาพอยู่ตรงกลางตามแนวตั้ง */
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

.title-section {
    width: 100%;
}
</style>
