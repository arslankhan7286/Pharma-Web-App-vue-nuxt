<template>
  <div class="page">
    <v-container class="h100 flex-grow-1 d-flex flex-column align-center justify-center">
      <Verify />
    </v-container>
  </div>
</template>

<script>
  import Verify from '~/components/vendorRegister/Verify';
  export default {
    components: { Verify },
    head() {
      return { title: 'Erxa | Vendor Verification', };
    },
  }
</script>
