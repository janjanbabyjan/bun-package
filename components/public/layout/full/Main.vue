<script setup lang="ts">
import { ref, shallowRef } from 'vue';
import sidebarItems from '@/components/public/layout/full/vertical-sidebar/sidebarItem';
import { Menu2Icon } from 'vue-tabler-icons';
const sidebarMenu = shallowRef(sidebarItems);
const sDrawer = ref(true);
</script>

<template>
    <!------Sidebar-------->
    <v-navigation-drawer class="v-navigation-drawer leftSidebar" left elevation="0" app  v-model="sDrawer" :style="{ borderRadius: '0' }">
        <!---Logo part -->
        <div class="pa-3 logoes">
            <img src="/public/images/logos/digix.jpeg" alt="">
            <!-- <PublicLayoutFullLogo /> -->
        </div>
        <!-- ---------------------------------------------- -->
        <!---Navigation -->
        <!-- ---------------------------------------------- -->
        <div class="public-scrollnavbar"> <!-- Add class for custom scrollbar -->
            <perfect-scrollbar>
                <v-list class="pa-6">
                    <!---Menu Loop -->
                    <template v-for="(item, i) in sidebarMenu">
                        <!---Item Sub Header -->
                        <PublicLayoutFullVerticalSidebarNavGroup :item="item" v-if="item.header" :key="item.title" />

                        <!---Single Item-->
                        <PublicLayoutFullVerticalSidebarNavItem :item="item" v-else class="leftPadding" />
                        <!---End Single Item-->
                    </template>
                </v-list>
            </perfect-scrollbar>
        </div>
    </v-navigation-drawer>
    <!------Header-------->
    <v-app-bar elevation="0">
        <div class="d-flex align-center justify-space-between w-100">
            <div>
                <v-btn class="hidden-lg-and-up ms-md-3 ms-sm-5 ms-3 text-muted" @click="sDrawer = !sDrawer" icon variant="flat" size="small">
                    <Menu2Icon size="20" stroke-width="1.5" />
                </v-btn>
                <!-- Notification -->
                <!-- <PublicLayoutFullVerticalHeaderNotificationDD/> -->
            </div>
            <div>
                <!-- Upgrade button -->
                <!-- <v-btn class="mr-2 bg-primary" href="https://adminmart.com/templates/nuxtjs/" target="_blank">Download Free</v-btn> -->
                <!-- User Profile -->
                <PublicLayoutFullVerticalHeaderProfileDD />
                <!-- <PublicLayoutFullVerticalHeaderSearchbar/> -->
            </div>
        </div>
    </v-app-bar>
</template>




<style src="/assets/scss/layout/_public_sidebar.scss" scoped></style>
