<!-- components\admin\body\galleryInput.vue -->
<script setup lang="ts">
import axios from 'axios';

const props = defineProps({
    initialImageUrls: {
        type: Array as () => string[],
        default: () => []
    },
    id: {
        type: Number,
        default: null
    }
});

onMounted(() => {
    if (props.initialImageUrls.length > 0) {
        for (let i = 0; i < props.initialImageUrls.length; i++) {
            imageUrls.value.push(`http://localhost:8000${props.initialImageUrls[i]}`);

        }
    }
});

const emit = defineEmits(['imageUploaded', 'imageRemoved', 'initialImageUrls']);
const imageUrls = ref<string[]>([]);
const selectedImageUrl = ref<string>('');
const dialog = ref<boolean>(false);
const fileInput = ref<HTMLInputElement | null>(null);
const uploadedFilePaths: any[] = [];
const backUPImage = ref(props.initialImageUrls)

const openFileInput = () => {
    if (fileInput.value) {
        fileInput.value.click();
    }
};

const handleFileUpload = async (event: any) => {
    const target = event.target as HTMLInputElement;
    const files = target.files;
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
                backUPImage.value.push()
                uploadedFiles.forEach((file: any) => {
    uploadedFilePaths.push(file.path);
    backUPImage.value.push(file.path); // This needs to match how you handle paths
});
                emit('imageUploaded', uploadedFilePaths);
                for (let i = 0; i < files.length; i++) {
                    if (files[i].type.startsWith('image/')) {
                        const previewUrl = URL.createObjectURL(files[i]);
                        imageUrls.value.push(previewUrl);
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

const deleteImage = async (index: number) => {
    console.log("🚀 ~ deleteImage ~ Index :", index)
    const [removedImageUrl] = backUPImage.value.splice(index, 1);

    try {
        const response = await axios.post(`http://localhost:8000/singlepage/${props.id}`, {
            content: backUPImage.value
        });

        if (response.data.statusCode === 200) {
            imageUrls.value.splice(index, 1);
            emit('imageRemoved', removedImageUrl);
        } else {
            console.error('Failed to update the server. Reverting changes.');
            backUPImage.value.splice(index, 0, removedImageUrl);
        }
    } catch (error) {
        console.error('Error while deleting image:', error);
        // Revert changes locally on error
        backUPImage.value.splice(index, 0, removedImageUrl);
      
    }
};




// const deleteImage = async (index: number) => {
//     const updatedImageUrls = [...imageUrls.value];
//     updatedImageUrls.splice(index, 1);
//     imageUrls.value = updatedImageUrls;

//     try {
//         const response = await axios.post(`http://localhost:8000/singlepage/${props.id}`, {
//             content: updatedImageUrls.map(url => url.replace('http://localhost:8000/', ''))
//         });
//         if (response.data.statusCode === 200) {
//             emit('initialImageUrlsUpdated', updatedImageUrls.map(url => url.replace('http://localhost:8000/', '')));
//         }
//     } catch (error) {
//         console.error('Error updating image URLs:', error);
//     }
// };

watch(() => props.initialImageUrls, (newUrls) => {
    imageUrls.value = [...newUrls];
});



watch(imageUrls, (newUrls) => {
    emit('initialImageUrls', newUrls);
}, { deep: true });

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
