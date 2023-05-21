<i18n lang="json5">
{
  en: {
    '1': 'Verifying Account...',
    '4': 'Token is Expierd or Invald.',
    '5': 'Resend verification email',
    '6': 'Your email address has been verified successfully',
    '7': 'Home',
    '8': 'THANK YOU!',
    '9': 'Thank you for confirming your email.',
    '10': 'For better experience use the erxa app',
    '11': 'Erxa App',
    '12': 'Open App',
    '13': 'If you do not have erxa app on your phone then you can download app for Google playstore or App Store or App gallery.',
  },
  ar: {
    '1': 'التحقق من الحساب...',
    '4': 'انتهت صلاحية الرمز المميز أو غير صالح.',
    '5': 'إعادة ارسال بريد التحقق',
    '6': 'تم التحقق من بريدك الإلكتروني بنجاح',
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
  <div class="page">
    <v-row v-if="loading" align="center" justify="center" class="flex-column flex-grow-1">
      <v-col cols="10" sm="8" md="6">
        <v-scale-transition>
          <div>
            <v-progress-linear
              :active="loading"
              color="primary"
              indeterminate
              rounded
              height="6"
            ></v-progress-linear>

            <h2 class="my-2 font-weight-bold text-h6 text-md-h5">{{ $t('1') }}</h2>
          </div>
        </v-scale-transition>
      </v-col>
    </v-row>
    <!-- SUCCESS MESSAGE HEADER -->
    <v-container v-if="showSuccess" fluid>
      <VerificationSuccess />
    </v-container>

    <v-container v-if="showError" fluid>
      <VerificationFail />
    </v-container>
  </div>
</template>

<script>
import VerificationSuccess from '@/components/verify-email/VerificationSuccess.vue';
import VerificationFail from '@/components/verify-email/VerificationFail.vue';
export default {
  components: {
    VerificationSuccess,
    VerificationFail,
  },
  data: () => ({
    loading: true,
    showError: false,
    showSuccess: false,
  }),
  head() {
    return {
      title: 'Erxa | Verify User Email',
    };
  },
  mounted() {
    // for better UX
    // setTimeout(() => {
    this.sendVerificationToken();
    // }, 3000);
  },
  methods: {
    async sendVerificationToken() {
      try {
        await this.$http.$post(
          '/users/verify-email/',
          {},
          {
            headers: {
              Authorization: 'Bearer ' + this.$route?.query?.token,
            },
          },
        );

        // show success message
        this.showSuccess = true;
      } catch (error) {
        this.showError = true;
      }

      // stop loading
      this.loading = false;
    },
    onResend() {
      // TODO:
    },
  },
};
</script>
