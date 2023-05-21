<i18n lang="json5">
{
  en: {
    '7': 'Home',
    '8': 'THANK YOU!',
    '9': 'Thank you for confirming your email.',
    '10': 'For better experience use the erxa app',
    '11': 'Erxa App',
    '12': 'Open App',
    '13': 'If you do not have erxa app on your phone then you can download app for Google playstore or App Store or App gallery.',
  },
  ar: {
    '7': 'الصفحة الرئيسية',
    '8': 'شكرا لك!',
    '9': 'نشكرك على تأكيد بريدك الالكتروني.',
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
        style="background: linear-gradient(180deg, #b42c2b -21.32%, #494b52 135.22%)"
      >
        <v-col cols="12">
          <v-img
            class="mx-auto my-10"
            width="150"
            height="150"
            contain
            src="/images/verify-email/email-verify-success.png"
          >
          </v-img>
        </v-col>
      </v-sheet>
    </v-row>

    <v-row align="center" class="flex-column flex-grow-1 mb-10">
      <!-- SHOW THIS BELOW SUCCES HEADER  -->

      <v-col cols="12">
        <h2 class="primary--text text-center">{{ $t('8') }}</h2>
        <p class="font-weight-bold text-center">{{ $t('9') }}</p>
        <v-card class="mx-auto justify-center pb-10" max-width="512px" outlined>
          <v-card-title class="font-weight-bold justify-center text-center">
            {{ $t('10') }}
          </v-card-title>
          <v-card-actions class="d-flex justify-space-around">
            <div class="d-flex justify-center align-center">
              <v-img src="/images/verify-email/erxa-app.png"></v-img>
              <p class="font-weight-bold mx-2 mt-3">{{ $t('11') }}</p>
            </div>

            <v-btn :href="getAppUrl()" color="primary" width="120" class="rounded-lg font-weight-bold">
              {{ $t('12') }}
            </v-btn>
          </v-card-actions>
          <v-divider width="95%" class="mx-auto my-5"></v-divider>

          <v-card-text class="text-center">
            {{ $t('13') }}
          </v-card-text>
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
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    url: null,
  }),
  methods: {
    getAppUrl() {
      if(process.client){
        console.log('verifyyyyy111', window.origin)
      }
      if (this.$device.isIos) {
        return (this.url = 'https://apps.apple.com/us/app/erxa-expert/id1576109528');
      }

      if (this.$device.isAndroid) {
        return (this.url = 'https://play.google.com/store/apps/details?id=com.erxaexpert');
      }

      if (this.$device.isDesktop) {
        if(process.client){
          this.url = window.origin
        }
        return this.url;
      }
    },
  },
};
</script>
