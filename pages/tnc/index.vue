<template>
  <div class="page">
    <v-container class="h100 flex-grow-1 d-flex flex-column align-center justify-center">
      <TermsAndConditionsText />
    </v-container>
  </div>
</template>

<script>
  import TermsAndConditionsText from '~/components/terms/TermsAndConditionsText';
  export default {
    components: { TermsAndConditionsText },
    head() {
      return { title: 'Erxa | Term & Conditions', };
    },
  }
</script>
