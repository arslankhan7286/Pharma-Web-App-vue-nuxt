<template>
  <div class="page">
    <Showcase />
  </div>
</template>

<script>
import Showcase from '~/components/index/Showcase.vue';
export default {
  components: {
    Showcase,
  },
  head() {
    return {
      title: 'Erxa | Digital Prescription',
    };
  },
};
</script>
