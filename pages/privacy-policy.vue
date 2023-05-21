<template>
  <div class="page">
    <v-container class="my-12 py-12">
      <h1 class="mb-8 text-h5 text-md-h3 text-center font-weight-bold">Privacy Policy</h1>

      <PrivacyPolicyText />
    </v-container>
  </div>
</template>

<script>
import PrivacyPolicyText from '@/components/privacy-policy/PrivacyPolicyText.vue';
export default {
  components: {
    PrivacyPolicyText,
  },
  head() {
    return {
      title: 'Erxa | Privacy and Policy Page',
    };
  },
};
</script>
