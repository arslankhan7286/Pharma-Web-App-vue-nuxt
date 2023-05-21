<template>
    <div class="page">
        <Orders />
    </div>
  </template>
  
  <script>
  import Orders from '~/components/prescriptions/sidebar/Orders.vue'
  export default {
    components: { Orders },
    middleware: 'isAuth',
    head() {
      return {
        title: 'Erxa | Dashboard',
      };
    },
  };
  </script>
  <style scoped>
  </style>
  