<template>
  <v-card elevation="0">
    <template v-slot:title>This is a title</template>
    <template v-slot:subtitle>This is a subtitle</template>
    <template v-slot:text>
      <CKEditorInline />
    </template>
  </v-card>
</template>

<script>
import CKEditorInline from '~/components/CKEditorInline.vue';

export default {
  components: {
    CKEditorInline,
  },
};
</script>


