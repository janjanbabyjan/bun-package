<script setup lang="ts">
import { RouterLink } from 'vue-router';
import logodark from '/images/logos/main-logo.png';
</script>

<template>
    <div class="logo">
        <RouterLink to="/">
            <img :src="logodark" alt="home"  />
        </RouterLink>
    </div>
</template>

<style>
.logo img {
    width: 178px;
    height: 80px;
    margin-left: 20px;
}
</style>
