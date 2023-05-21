<i18n lang="json5">
{
  en: {
    '1': 'This website uses cookies',
    '2': 'We use cookies to analyze website traffic and optimize your website experience. By accepting our use of cookies, your data will be aggregated with all other user data.',
    '3': 'ACCEPT',
  },
  ar: {
    '1': 'هذا الموقع يستخدم الكوكيز',
    '2': 'نستخدم ملفات تعريف الارتباط لتحليل حركة مرور الموقع وتحسين تجربة موقع الويب الخاص بك.من خلال قبول استخدامنا لملفات تعريف الارتباط، سيتم تجميع بياناتك مع جميع بيانات المستخدم الأخرى.',
    '3': 'قبول',
  },
}
</i18n>
<template>
  <v-scroll-y-reverse-transition>
    <v-card
      v-if="showAcceptCookieModal"
      elevation="4"
      class="accept-cookie-card ma-0 ma-sm-4 pa-2"
      :max-width="$vuetify.breakpoint.smAndUp ? '320' : '100%'"
    >
      <v-card-title class="text-title">
        {{ $t('1') }}
      </v-card-title>
      <v-card-text class="black--text">
        {{ $t('2') }}
      </v-card-text>

      <v-card-actions class="pt-0">
        <v-btn outlined block rounded color="#30BC8F" @click="onAcceptCookies">
          {{ $t('3') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-scroll-y-reverse-transition>
</template>

<script>
export default {
  data: () => ({
    showAcceptCookieModal: false,
  }),
  mounted() {
    // check user accept cookie status
    this.$store.commit('checkCookieTermsStatus');
    this.showAcceptCookieModal = !this.$store.state.cookieTermsAccepted;
  },
  methods: {
    onAcceptCookies() {
      // update accept cookies status on click
      this.showAcceptCookieModal = false;
      this.$store.commit('updateCookieTermsAccepted', true);
    },
  },
};
</script>

<style scoped>
.accept-cookie-card {
  bottom: 0;
  right: 0;
  float: right;
  position: fixed;
  z-index: var(--accept-cookie-index);
}
.accept-cookie-card .text-title {
  color: #30bc8f;
}
.accept-cookie-card .v-card__actions button {
  color: #30bc8f !important;
}
</style>
