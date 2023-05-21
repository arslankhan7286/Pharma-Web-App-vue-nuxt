<i18n lang="json5">
{
  en: {
    '1': 'This prescription is no longer valid.',
    '2': 'For assistance',
    '3': 'Email Us',
    '4': 'Call Us',
  },
  ar: {
    '1': 'هذه الوصفة لم تعد صالحة.',
    '2': 'للمساعدة',
    '3': 'البريد الالكتروني',
    '4': 'اتصل بنا',
  },
}
</i18n>

<template>
  <div class="page">
    <v-container class="d-flex flex-column justify-center align-center">
      <v-img height="200" width="200" class="my-2" src="/images/prescriptions/invalid-p.png"></v-img>
      <h1 class="text-h6 text-md-h4 font-weight-bold text-center my-2 my-md-4">{{ $t('1') }}</h1>
      <h1 class="text-h6 text-md-h4 font-weight-bold text-center my-2 my-md-4">{{ $t('2') }}</h1>
      <div class="d-flex flex-column align-center justify-center my-4">
        <v-btn href="mailto:admin@erxa.io" title="Email" width="200" outlined class="rounded-xl my-1">
          <span class="mx-1 font-weight-bold"> {{ $t('3') }} </span>
          <v-icon color="#30bc8f"> {{ mdiEmailOutline }} </v-icon>
        </v-btn>

        <v-btn href="tel:22240702" title="Phone" width="200" outlined class="rounded-xl my-1">
          <span class="mx-1 font-weight-bold"> {{ $t('4') }} </span>
          <v-icon color="#30bc8f"> {{ mdiPhoneOutline }} </v-icon>
        </v-btn>
      </div>
    </v-container>
  </div>
</template>

<script>
import { mdiPhone, mdiEmailOutline, mdiPhoneOutline } from '@mdi/js';
export default {
  components: {},
  data: () => ({
    mdiPhone,
    mdiEmailOutline,
    mdiPhoneOutline,
  }),
  head() {
    return {
      title: 'Erxa | Paid!',
    };
  },
};
</script>
