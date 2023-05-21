<template>
  <div class="page">
    <v-container class="h100 flex-grow-1 d-flex flex-column align-center justify-center">
      <VendorSignup2 />
    </v-container>
  </div>
</template>

<script>
  import VendorSignup2 from '~/components/vendorRegister/VendorSignup2';
  export default {
    components: { VendorSignup2 },
    head() {
      return { title: 'Erxa | Vendor Registration', };
    },
  }
</script>
