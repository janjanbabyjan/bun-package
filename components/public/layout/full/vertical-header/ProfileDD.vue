<script setup lang="ts">
import { UserIcon, MailIcon, ListCheckIcon } from 'vue-tabler-icons';
</script>

<template>
    <!-- ---------------------------------------------- -->
    <!-- notifications DD -->
    <!-- ---------------------------------------------- -->
    <div class=" w-100 ">
        <v-text-field class="mr-5" solo flat hide-details dense append-inner-icon="mdi-magnify" placeholder="Search..."></v-text-field>
    </div>

</template>

<style>
.v-text-field {
    width: 150px;
}
</style>
