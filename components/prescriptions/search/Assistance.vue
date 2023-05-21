<i18n lang="json5">
{
  en: {
    '7': 'WhatsApp',
    '8': 'Call us',
    '9': 'For assistance',
  },
  ar: {
    '7': 'واتس اب',
    '8': 'اتصل بنا',
    '9': 'للمساعدة',
  },
}
</i18n>
<template>
  <div class="d-flex flex-column align-center justify-center my-4">
    <p class="text-caption text-md-h6 font-weight-bold">{{ $t('9') }}</p>

    <v-btn :href="getWhatsappLink()" title="WhatsApp" outlined class="rounded-xl my-1">
      <span class="text-button mx-1"> {{ $t('7') }} </span>
      <v-icon color="green"> {{ mdiWhatsapp }} </v-icon>
    </v-btn>

    <v-btn href="tel:+9651800229" block title="Call" outlined class="rounded-xl my-1">
      <span class="text-button mx-1"> {{ $t('8') }} </span>
      <v-icon>{{ mdiPhone }}</v-icon>
    </v-btn>
  </div>
</template>

<script>
import { mdiPhone, mdiWhatsapp } from '@mdi/js';

export default {
  data: () => ({ mdiPhone, mdiWhatsapp }),
  methods: {
    getWhatsappLink() {
      if (this.isMobile()) {
        return 'whatsapp://send?phone=+9651800229';
      } else {
        return 'https://web.whatsapp.com/send?phone=+9651800229';
      }
    },
    isMobile() {
      if (
        process.client &&
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style></style>
