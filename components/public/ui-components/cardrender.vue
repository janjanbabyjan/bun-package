<script setup lang="ts">
import { Blog } from '@/data/dashboard/dashboardData';
const path = "/public/ui-components/content/10"
</script>
<template>
    <div class="py-md-15 py-sm-8">
        <v-container>
            <v-row class="justify-center header-test">
                <v-col cols="12" sm="8">
                    <div class="text-center">
                        <div class="d-flex align-center mb-5 justify-center" data-aos="fade-right" data-aos-delay="200"
                            data-aos-duration="1000">
                            <span class="bg-success pa-2 rounded-circle mr-2"></span>
                            <h6 class="text-subtitle-1 text-dark font-weight-bold">Blog</h6>
                        </div>
                        <h2 class="text-h2 text-dark mb-3" data-aos="fade-left" data-aos-delay="200"
                            data-aos-duration="1000">ตัวอย่างตัวอย่างตัวอย่าง</h2>
                        <p class="text-muted mb-4">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                    </div>
                </v-col>
            </v-row>
            <v-row class="justify-center">
                <v-col cols="12" md="4" sm="6" v-for="card in Blog" :key="card.title" class="mb-4">

                    <v-card elevation="0" variant="outlined" class="card-with-min-height">
                        <div class="hover-card overflow-hidden lh-10 rounded-md rounded-be-0 position-relative">
                            <NuxtLink :to="card.path" class="text-decoration-none">
                                <v-img :src="card.img" height="250px" alt="post" cover class="zoom-in w-100">
                                </v-img>
                            </NuxtLink>
                        </div>
                        <div class="pa-4 mt-2">
                            <div class="d-flex justify-space-between align-center">
                                <p class="text-muted text-subtitle-1">{{ card.date }} </p>
                                <v-chip color="primary" height="auto" size="small" variant="tonal" rounded="md">{{
                                    card.badge
                                }}</v-chip>
                            </div>
                            <div class="mt-4">
                                <h5 class="text-h5 font-weight-bold mb-3 lh-normal title-line-clamp">
                                    <NuxtLink class="text-decoration-none text-dark hover-primary"
                                        :to="`/public/ui-components/content/${card.id}`">{{ card.title
                                        }}</NuxtLink>
                                </h5>
                                <!-- <p class="text-muted text-subtitle-1 font-weight-regular mb-3">{{ card.desc }}</p> -->
                            </div>
                        </div>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<style>
.title-line-clamp {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    /* Adjust the number of lines you want to display */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}

@media only screen and (max-width: 376px) {
    .header-test{
        padding-top: 15rem;
    }
}

@media only screen and (max-width: 800px ) {
    .header-test{
        padding-top: 15rem;

    }
}

</style>
