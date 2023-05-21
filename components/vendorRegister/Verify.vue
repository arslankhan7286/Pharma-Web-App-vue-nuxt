<template>
  <div>
    <GlobalLoading ref="loading" />
    <h2>You are Verified Successfully. Thank You.</h2>
  </div>
</template>
<script>
import GlobalLoading from '~/components/layout/GlobalLoading.vue';
export default {
  components: { GlobalLoading },
  data: () => ({}),
  async mounted() {
    this.$refs.loading.start();
    console.log('verifyyyy', this.route.query)
    try {
      const res = await this.$axios.$post(
        'automations/vendor/verify/',
        this.$route.query,
        {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(res);
      this.$toast.success('You are Verified');
    } catch (e) {
      console.log(e);
    }
    this.$refs.loading.finish()
  },
};
</script>
