<i18n lang="json5">
{
  en: {
    '1': 'Transaction was not successful.',
    '2': 'Contact Us',
    '3': 'Call Us',
    '4': 'Email us',
    '5': 'For assistance',
    '6': 'Retry',
  },
  ar: {
    '1': 'عملية الدفع غير ناجحة',
    '2': 'تواصل معنا',
    '3': 'اتصل بنا',
    '4': 'راسلنا',
    '5': 'للمساعدة',
    '6': 'إعادة المحاولة',
  },
}
</i18n>

<template>
  <div class="flex-grow-1 d-flex flex-column align-center justify-center">
    <h1 class="text-h6 text-md-h4 font-weight-bold">{{ $t('1') }}</h1>
    <div class="d-flex">
      <v-btn class="my-7 rounded-xl font-weight-bold mx-4" color="primary" large @click="goToStep">{{
        $t('6')
      }}</v-btn>
    </div>

    <div class="d-flex flex-column align-center justify-center">
      <h1 class="text-h6 text-md-h4 font-weight-bold text-center my-4 my-md-8">{{ $t('5') }}</h1>
      <v-btn href="tel:22240702" width="200" outlined class="rounded-xl my-1">
        <span class="mx-1 font-weight-bold">
          {{ $t('3') }}
        </span>
        <v-icon color="primary">
          {{ mdiPhoneOutline }}
        </v-icon>
      </v-btn>
      <v-btn
        href="mailto:admin@erxa.io?body=Dear Erxa Support Team%0D%0D     My name is"
        width="200"
        outlined
        class="rounded-xl my-1"
      >
        <span class="mx-1 font-weight-bold">
          {{ $t('4') }}
        </span>
        <v-icon color="primary">
          {{ mdiEmailOutline }}
        </v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mdiPhoneOutline, mdiEmailOutline } from '@mdi/js';
export default {
  data: () => ({
    mdiPhoneOutline,
    mdiEmailOutline,
  }),
  methods: {
    goToStep() {
      const id = this.$route.params.id;
      this.$router.push(`/p/${id}`);
      this.$store.commit('prescription/goToNextStep', 1);
    },
  },
};
</script>
