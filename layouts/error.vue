<i18n lang="json5">
{
  en: {
    '1': 'Go To Home',
  },
  ar: {
    '1': 'الصفحة الرئيسية',
  },
}
</i18n>

<template>
  <div class="page">
    <v-container class="my-12">
      <v-row v-if="error.statusCode" class="d-flex flex-column justify-center align-center">
        <h2 class="primary--text text-center">{{ message }}</h2>

        <v-divider class="my-6 w100"></v-divider>
        <v-col cols="10" md="6" lg="5" class="error-svg-container ltr">
          <Error404Svg v-if="error.statusCode === 404" />
          <Error500Svg v-else />
        </v-col>

        <nuxt-link :to="localePath('/')" class="text-decoration-none my-8">
          <v-btn depressed rounded x-large class="font-weight-bold" color="#30BC8F">
            {{ $t('1') }}
          </v-btn>
        </nuxt-link>
      </v-row>

      <div v-else>An Error Ocurred</div>
    </v-container>
  </div>
</template>

<script>
import Error404Svg from '~/static/images/error-404.svg?inline';
import Error500Svg from '~/static/images/error-500.svg?inline';

export default {
  components: {
    Error404Svg,
    Error500Svg,
  },
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data: () => ({
    title: 'Error Page',
    message: null,
  }),
  head() {
    if (this.error.statusCode) {
      if (this.error.statusCode === 404) {
        this.title = 'Page Not Found';
      } else {
        this.title = 'An Error Occurred';
      }
    }
    return {
      title: this.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Erxa Web Application Error Page',
        },
      ],
    };
  },
  beforeMount() {
    if (this.error?.response?.data) {
      const key = Object.keys(this.error.response.data)[0];
      if (key && Array.isArray(this.error.response.data[key])) {
        this.message = this.error.response.data[key][0]?.description;
      }
    }
  },
};
</script>

<style scoped>
a .v-btn {
  color: #fff;
}
</style>
