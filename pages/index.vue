<template>
    <div>555</div>
</template>


<script>
export default {
  async beforeCreate() {
    // Redirect to "/public/dashboard" when accessing the root path
    this.$router.push('/public/dashboard');
  }
}
</script>