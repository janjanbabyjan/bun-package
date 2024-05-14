<script setup lang="ts">
import { UserIcon, MailIcon, ListCheckIcon } from 'vue-tabler-icons';
</script>

<template>
    <div class="logo">
        <img src="/images/logos/banpulogo.png" alt="background" />
    </div>
    <div class=" w-100 search">
        <v-text-field class="mr-5" solo flat hide-details dense append-inner-icon="mdi-magnify"
            placeholder="Search..."></v-text-field>
    </div>

</template>

<style>
.logo {
    display: none
}

.v-text-field {
    width: 150px;
}

@media (max-width: 500px) {
    .search .v-text-field {
        display: none
    }

}

@media (max-width: 1281px) {
    .logo {
        img {
            width: 100%;
        }

        display: block;
        width: 60px;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 10px;
    }

}


</style>
