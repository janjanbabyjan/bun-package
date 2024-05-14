<script setup lang="ts">

definePageMeta({
  layout: "admin",
});

// ตัวบอกหน้า
const breadcrumbs = [
  { text: 'หน้าแรก', href: '/admin' },
  { text: 'รายชื่อหน้าเว็บไซต์', href: '/admin/content/manage-single-page' },
  { text: 'เพิ่มรูป', href: '/admin/content/galler/add' },
];

const getBreadcrumbText = (index: number) => {
  return breadcrumbs[index].text;
};

</script>

<template>
  <div>
    <!-- Breadcrumb navigation -->
    <v-breadcrumbs>
      <v-breadcrumbs-item v-for="(breadcrumb, index) in breadcrumbs" :key="index" @click="navigateTo(breadcrumb.href)"
        class="breadcrumb-item">
        {{ getBreadcrumbText(index) }}
        <template v-if="index < breadcrumbs.length - 1"> > </template>
      </v-breadcrumbs-item>
    </v-breadcrumbs>

    <AdminHeadingInputHeading/>
    <AdminBodyGalleryInput/>

  </div>
</template>
<style scoped>
.breadcrumb-item {
  cursor: pointer;
}
.center-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
