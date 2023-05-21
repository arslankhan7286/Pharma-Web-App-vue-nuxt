<i18n lang="json5">
{
  en: {
    '1': 'Search for your prescription',
    '4': 'Enter your mobile number to find your prescription.',
  },
  ar: {
    '1': 'ابحث عن وصفتك',
    '4': 'ادخل رقم هاتفك النقال لتتمكن من الوصول الى وصفتك.',
  },
}
</i18n>

<template>
  <div class="w100 d-flex flex-column align-center justify-center">
    <div class="erxa-logo w100 text-center">
      <img src="https://erxa-files.s3.amazonaws.com/assets/erxa_one.png" alt="">
    </div>

    <h1 class="text-h5 text-md-h4 font-weight-bold">{{ $t('1') }}</h1>
    <p class="text-caption text-md-h6">{{ $t('4') }}</p>
  </div>
</template>

<script>

export default {
  components: {},
};
</script>

<style scoped>
.erxa-logo {
  width: 250px;
  margin: 0 auto;
}
.erxa-logo img {
  width: 100%;
  height: auto;
}
/* change svg path color */
.erxa-logo > svg > g {
  fill: var(--primary-color);
}
</style>
