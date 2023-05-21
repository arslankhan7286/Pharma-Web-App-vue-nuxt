<template>
  <div class="page">
    <v-container class="my-12 py-12">
      <h1 class="mb-8 text-h5 text-md-h3 text-center font-weight-bold">Terms and Conditions of Use</h1>
      <TermsAndConditionsText />
    </v-container>
  </div>
</template>

<script>
export default {
  components: {
    TermsAndConditionsText: () => import('@/components/terms/TermsAndConditionsText.vue'),
  },
  head() {
    return {
      title: 'Erxa | Terms and Conditions Page',
    };
  },
};
</script>
