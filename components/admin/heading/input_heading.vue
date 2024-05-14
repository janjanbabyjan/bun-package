<template>
    <div class="center-container">
        <v-card elevation="10" class="withbg center-card" style="max-width: 1000px;">
            <v-card-item class="pa-6">
                <v-row class="mt-1">
                    <v-col style="max-width: 500px;">
                        <v-text-field label="หัวข้อ"></v-text-field>
                    </v-col>
                    <v-col style="max-width: 350px;">
                        <v-text-field label="วันที่สร้าง" class="ml-8" type="date" />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-row>
                            <span class="ml-4">สถานะ</span>
                            <v-col>
                                <v-switch v-model="status"></v-switch>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-card-item>
        </v-card>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const status = ref(false);
</script>

<style></style>