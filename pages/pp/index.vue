<template>
  <div class="page">
    <v-container class="h100 flex-grow-1 d-flex flex-column align-center justify-center">
      <PrivacyPolicyText />
    </v-container>
  </div>
</template>

<script>
  import PrivacyPolicyText from '~/components/privacy-policy/PrivacyPolicyText';
  export default {
    components: { PrivacyPolicyText },
    head() {
      return { title: 'Erxa | Privacy Policy', };
    },
  }
</script>
