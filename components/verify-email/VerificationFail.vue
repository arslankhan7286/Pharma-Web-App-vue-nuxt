<i18n lang="json5">
{
  en: {
    '7': 'Home',
    '8': 'Sorry, Verification Failed.',
    '9': 'Your Email is already verified.',
    '10': 'For better experience use the erxa app',
    '11': 'Erxa App',
    '12': 'Open App',
    '13': 'If you do not have erxa app on your phone then you can download app for Google playstore or App Store or App gallery.',
  },
  ar: {
    '7': 'الصفحة الرئيسية',
    '8': 'عذرا، فشل التحقق',
    '9': 'تم التحقق من بريدك الالكتروني مسبقا',
    '10': 'لتجربة أفضل يمكنك استخدام تطبيق اركسا',
    '11': 'تطبيق اركسا',
    '12': 'فتح التطبيق',
    '13': 'إذا لم تقم بتثبيت تطبي اركسا يمكنك القيام بذلك عن طريق تحميل وتثبيت التطبيق من خلال متجر جوجل(Play Store) أو آبل(App Store) أو هواوي (App Gallery)',
  },
}
</i18n>

<template>
  <div>
    <v-row align="center" class="d-flex flex-column flex-grow-1">
      <v-sheet
        width="100%"
        height="100%"
        style="background: linear-gradient(180deg, #adabab -21.32%, #535353 135.22%)"
      >
        <v-col cols="12">
          <v-img
            class="mx-auto my-10"
            width="150"
            height="150"
            contain
            src="/images/verify-email/email-verify-fail.png"
          >
          </v-img>
        </v-col>
      </v-sheet>
    </v-row>

    <v-row align="center" class="flex-column flex-grow-1 mb-10">
      <!-- SHOW THIS BELOW SUCCES HEADER  -->

      <v-col cols="12">
        <h2 class="verify-text text-center my-3">{{ $t('8') }}</h2>
        <p class="font-weight-bold text-center">{{ $t('9') }}</p>
      </v-col>
    </v-row>
  </div>
</template>
<style scoped>
.verify-text {
  color: #30bc8f;
}
</style>