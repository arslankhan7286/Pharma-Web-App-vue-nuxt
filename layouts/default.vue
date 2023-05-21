<template>
  <v-app>
    <v-main ref="main">
      <Header />

      <Nuxt />
      <GlobalSnackbar />
      <AcceptCookies />
      <Footer />
    </v-main>
  </v-app>
</template>

<script>
import Footer from '~/components/layout/Footer.vue';
import Header from '~/components/layout/Header.vue';
import GlobalSnackbar from '~/components/layout/GlobalSnackbar.vue';
import AcceptCookies from '~/components/layout/AcceptCookiesModal.vue';
export default {
  components: {
    Footer,
    Header,
    AcceptCookies,
    GlobalSnackbar,
  },
  head() {
    const i18nHead = this.$nuxtI18nHead({ addSeoAttributes: true });
    // add i18n and canonical tags in header
    // note: i18n will add canonical link and we dont need extra configuration
    return {
      htmlAttrs: { ...i18nHead.htmlAttrs },
      meta: [...i18nHead.meta],
      link: [...i18nHead.link],
    };
  },

  created() {
    this.$root.$on("updateHeader", () => {
      // update the header component
      this.$refs.header.updateHeader();
    });
    
    // change layout direction in initialization
    const locale = this.$i18n?.locales?.find(locale => {
      return locale.code === this.$i18n.locale;
    });

    // check locale is rtl
    this.$vuetify.rtl = !!locale?.rtl;
  },
};
</script>
