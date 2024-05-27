<script setup lang="ts">
import { Portfolio } from '@/data/dashboard/dashboardData';
import Icon from '../layout/full/vertical-sidebar/Icon.vue';
// import Image from 'primevue/image';
import Image from 'primevue/image';
import axios from 'axios';


const selectedImageUrl = ref('');
const showImageModal = ref(false);
const zoom = ref(1);

const handleWheel = (e: WheelEvent) => {
    const delta = e.deltaY < 0 ? 0.1 : -0.1;
    zoom.value = Math.max(0.5, Math.min(2, zoom.value + delta));
};

const zoomIn = () => {
    zoom.value = Math.min(2, zoom.value + 0.1);
};

const zoomOut = () => {
    zoom.value = Math.max(0.5, zoom.value - 0.1);
};



const uploadedFiles = ref([]);

const handleFileUpload = async (files: any) => {
    try {
        const formData = new FormData();
        for (const file of files) {
            formData.append('files', file);
        }

        const response = await axios.post('/api/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        uploadedFiles.value = response.data.map((file: any) => `/uploads/${file.filename}`);
    } catch (error) {
        console.error('Error uploading files:', error);
    }
};

</script>

<template>




    <div class="py-md-15 py-8 gallery">

        <v-container>
            <v-row class="justify-center">
                <v-col cols="12" sm="8">
                    <div class="text-center">
                        <div class="d-flex align-center mb-5 justify-center" data-aos="fade-right" data-aos-delay="200"
                            data-aos-duration="1000"></div>
                        <h2 class="text-h2 text-dark mb-3" data-aos="fade-left" data-aos-delay="200"
                            data-aos-duration="1000">Gallery</h2>
                    </div>
                </v-col>
            </v-row>
            <v-row class="justify-center">
                <v-col cols="12" md="4" sm="6" v-for="card in Portfolio" :key="card.title" class="mb-2">
                    <div class="hover-card overflow-hidden lh-10 rounded-md position-relative">
                        <v-img :src="card.img" height="250px" alt="post" cover class="zoom-in w-100"
                            @click="showImageModal = true; selectedImageUrl = card.img"></v-img>

                        <img v-for="(imageUrl, index) in uploadedFiles" :key="index" :src="imageUrl"
                            alt="Uploaded Image" class="uploaded-image" />
                    </div>
                    <div class="mt-4">
                        <h5 class="text-h5 font-weight-bold text-13">
                            <NuxtLink class="text-decoration-none text-dark hover-primary" to="/">{{ card.title }}
                            </NuxtLink>
                        </h5>
                    </div>
                </v-col>
            </v-row>
        </v-container>

        <!-- Add a Vuetify modal or dialog component -->
        <v-dialog v-model="showImageModal" max-width="800" max-height="1000">
            <!-- <v-card> -->
            <v-container>
                <div class="image-container">
                    <img :src="selectedImageUrl" :style="{
                        transform: `scale(${zoom})`,
                        transformOrigin: 'center',
                    }" @wheel.prevent="handleWheel" />
                </div>
                <v-card-actions>
                    <v-btn icon @click="zoomOut">
                        <v-icon>mdi-magnify-minus-outline</v-icon>
                    </v-btn>
                    <v-btn icon @click="zoomIn">
                        <v-icon>mdi-magnify-plus-outline</v-icon>
                    </v-btn>
                </v-card-actions>
            </v-container>
            <!-- </v-card> -->
        </v-dialog>
    </div>
</template>



<style scoped>
.image-container {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

.image-container img {
    max-width: 100%;
    max-height: 100%;
    transition: transform .3s ease-in-out;
}

.image-container img:hover {
    transform: scale(1.2);
    /* Zoom in by 20% on hover */
}

.v-icon {
    /* color: #000000; */
    color: #ffffff;
}

/* .v-dialog .v-container {
    background-color: #ffffff;
} */

.v-dialog .v-container .v-card-actions {
    justify-content: center;
    align-items: center;
}
</style>
