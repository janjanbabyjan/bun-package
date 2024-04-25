<template>
    <div>
      <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
    </div>
  </template>
  
  <script>
  
  import CKEditor from '@ckeditor/ckeditor5-vue';
  import InlineEditor from '@ckeditor/ckeditor5-build-inline';
  
  export default {
    components: {
      ckeditor: CKEditor.component,
    },
    data() {
      return {
        editor: InlineEditor,
        editorData: '',
        editorConfig: {
          // Configuration options
        },
      };
    },
  };
  </script>
  