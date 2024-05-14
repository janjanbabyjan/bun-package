<script setup lang="ts">
definePageMeta({
  layout: "default",
});
import { ref } from 'vue';

import Closable from '~/components/public/ui-components/boximage.vue';

</script>

<template>
    <v-row>
        <v-col cols="12">
            <v-row>
                <v-col cols="12">
                    <PublicUiComponentsOutput/>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>
