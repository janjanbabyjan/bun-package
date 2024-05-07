<script setup lang="ts">
import { ref } from 'vue';

import outputData from '~/components/public/ui-components/boxoutput.vue';

</script>

<template>
  <v-row>
    <v-col cols="12">
      <v-row>
        <v-col cols="12">
          <PublicUiComponentsBoxoutput/>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>



<!-- <v-row>
  <v-col cols="12" sm="12" lg="12">
    <UiChildCard title="With Props">
      <CardsProps />
    </UiChildCard>
  </v-col> -->