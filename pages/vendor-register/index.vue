<template>
  <div class="page">
    <v-container class="h100 flex-grow-1 d-flex flex-column align-center justify-center">
      <VendorRegister />
    </v-container>
  </div>
</template>

<script>
  import VendorRegister from '~/components/vendorRegister/VendorSignup';
  export default {
    components: { VendorRegister },
    head() {
      return { title: 'Erxa | Vendor Registration', };
    },
  }
</script>
