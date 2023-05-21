<template>
  <!-- Prescriptions Page -->
  <div class="page">
    <h2>List of Prescriptions (new, rejected, saved)</h2>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: 'Erxa | Prescription',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Checkout Page',
        },
        {
          name: 'robots',
          content: 'noindex',
        },
      ],
    };
  },
};
</script>

<style>
h2 {
  padding: 30px;
}
</style>
