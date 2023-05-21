<i18n lang="json5">
{
  en: {
    '1': 'Welcome to our erxa family!',
    '2': 'Please download the app to start your journey with us',
  },
  ar: {
    '1': 'مرحبًا بك في عائلة إكسا الخاصة بنا!',
    '2': 'يرجى تنزيل التطبيق لتبدأ رحلتك معنا',
  },
}
</i18n>

<template>
  <div class="page">
    <v-container>
      <h1 class="text-h6 text-md-h4 font-weight-bold text-center my-4 my-md-8">{{ $t('1') }}</h1>
      <p class="text-caption text-md-h6 font-weight-bold text-center my-4 my-md-8">{{ $t('2') }}</p>

      <div class="d-flex justify-center align-center flex-wrap">
        <a href="https://apps.apple.com/us/app/erxa-expert/id1576109528">
          <v-img
            alt="apple store image"
            contain
            width="100px"
            height="35px"
            class="flex-grow-0 mx-2"
            src="/images/expert-signup/apple-store-img.png"
          />
        </a>

        <a href="https://play.google.com/store/apps/details?id=com.erxaexpert">
          <v-img
            alt="google play image"
            contain
            class="flex-grow-0 mx-2"
            width="110px"
            height="35px"
            src="/images/expert-signup/google-play-img.png"
          />
        </a>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  components: {},
  head() {
    return {
      title: 'Erxa | Welcome to Expert',
      meta: [],
    };
  },
};
</script>

<style></style>
