<i18n lang="json5">
{
  en: {
    '1': 'Comming Soon...',
    '2': 'Get in touch',
  },
  ar: {
    '1': 'قريبا ...',
    '2': 'ابقى على تواصل',
  },
}
</i18n>

<template>
  <section class="showcase py-6 white d-flex flex-column align-center">
    <div class="erxa-logo w100 text-center">
      <img src="https://erxa-files.s3.amazonaws.com/assets/erxa_one.png" alt="">
    </div>

    <!-- <div class="roboto">
      <h1 class="text-h2 text-sm-h1 font-weight-bold">erxa</h1>
    </div>

    <p class="subtitle-2">{{ $t('1') }}</p> -->

    <!-- Get in touch Button -->
    <v-btn
      x-large
      outlined
      class="my-10 rounded-xl font-weight-bold"
      color="#30bc8f"
      href="mailto:admin@erxa.io?subject=Hi erxa!"
    >
      {{ $t('2') }}
    </v-btn>
  </section>
</template>

<script>

export default {
  components: {},
};
</script>

<style scoped>
.roboto h1 {
  color: #30bc8f;
}
section p {
  color: #30bc8f;
}
.showcase > .erxa-logo {
  width: 20%;
  height: 30%;
}
.erxa-logo img {
  width: 100%;
  height: auto;
}
/* change svg path color */
.showcase > svg > g {
  fill: var(--primary-color);
}
</style>
