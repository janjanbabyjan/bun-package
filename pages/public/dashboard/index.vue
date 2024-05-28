<!-- pages\public\dashboard\index.vue -->
<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const navigateToCardRender = () => {
  router.push('/public/ui-components/cardrender');
};
</script>

<template>
    <PublicDashboardHeaders />
    <PublicDashboardCarousel />
    <div>
        <PublicUiComponentsCardrender :limitCards="3" />
        <div class="showmore">
            <v-btn color="primary" @click="navigateToCardRender">แสดงทั้งหมด</v-btn>

            
        </div>
    </div>


    <!-- <PublicUiComponentsGallery /> -->
    <PublicUiComponentsFooter />
</template>

<style src="/assets/scss/pages/_public_dashboards.scss" scoped></style>
