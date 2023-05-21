<template>
    <div class="page">
        <Thankyou />
    </div>
  </template>
  
  <script>
  import Thankyou from '~/components/thankyou/Thankyou.vue'
  export default {
    components: { Thankyou },
    head() {
      return {
        title: 'Erxa | Thank you!',
      };
    },
  };
  </script>
  <style scoped>
  .page {
    background: #c2bcbc;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  </style>
  