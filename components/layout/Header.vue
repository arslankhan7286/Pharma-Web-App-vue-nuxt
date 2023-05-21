<i18n lang="json5">
{
  en: {
    '1': 'Home',
    '2': 'Login',
  },
  ar: {
    '1': 'الصفحة الرئيسية',
    '2': 'تسجيل الدخول',
  },
}
</i18n>
<template>
  <header>
    <!-- App bar -->
    <v-app-bar fixed tag="div" elevation="4" color="#0E6998" hide-on-scroll :scroll-threshold="40">
      <v-container class="d-flex justify-space-between align-center pa-0">
        <!-- Erxa Logo -->
        <v-toolbar-title>
          <nuxt-link class="erxa-logo" :to="localePath('/')">
            <img src="https://erxa-files.s3.amazonaws.com/assets/erxa_two.png" alt="" />
          </nuxt-link>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <!-- Only Show in Medium size -->
        <div class="d-none d-md-block">
          <!-- Home page Link -->
          <nuxt-link :to="localePath('/')" class="text-decoration-none">
            <v-btn color="#fff" class="font-weight-bold rounded-lg" text> {{ $t('1') }} </v-btn>
          </nuxt-link>
        </div>

        <!-- Language Switcher -->

        <div :class="{ roboto: $vuetify.rtl, tajawal: !$vuetify.rtl }">
          <v-btn
            color="#fff"
            :class="isDashboard ? 'hidden' : ''"
            class="font-weight-bold rounded-lg"
            text
            @click="$i18n.setLocale(getNesxtLanguageCode.code)"
          >
            {{ getNesxtLanguageCode.name }}
            <v-icon right> {{ mdiWeb }} </v-icon>
          </v-btn>
        </div>
        <!-- <div class="d-md-block" v-if="getPath !=='login' && getPath !== 'er'">
            <nuxt-link :to="localePath('/login')">
                <v-btn color="#30BC8F" class="font-weight-bold rounded-lg" text> {{ $t('2') }} </v-btn>
            </nuxt-link>
        </div> -->
        <Logout v-if="updateHeader()"/>

        <!-- Navigation Drawer Toggle button -->
        <!-- hidden in medium size -->
        <v-btn
          class="d-md-none"
          width="35"
          height="35"
          color="#fff"
          icon
          @click.stop="drawer = !drawer"
        >
          <v-icon>{{ mdiMenu }}</v-icon>
        </v-btn>
      </v-container>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" fixed class="navigation-drawer">
      <!-- Erxa Cloud Logo -->
      <div class="erxa-cloud-svg text-center">
        <img src="https://erxa-files.s3.amazonaws.com/assets/erxa_one.png" alt="">
      </div>

      <!-- List of Page links -->
      <v-list nav dense>
        <v-list-item-group>
          <v-list-item :to="localePath('/')" exact exact-active-class="primary--text">
            <v-list-item-icon>
              <v-icon> {{ mdiHomeOutline }} </v-icon>
            </v-list-item-icon>
            <v-list-item-title class="font-weight-bold"> {{ $t('1') }} </v-list-item-title>
          </v-list-item>

          <!-- <v-divider class="my-4"></v-divider> -->
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </header>
</template>

<script>
import { mdiWeb, mdiMenu, mdiHomeOutline, mdiPhoneOutline } from '@mdi/js';
import Logout from '~/components/logout/Logout.vue'

export default {
  components: {
    Logout,
  },
  data: () => ({
    mdiWeb,
    mdiMenu,
    drawer: false,
    mdiHomeOutline,
    mdiPhoneOutline,
  }),

  methods: {
      updateHeader() {
        if(this.$route.name === 'er' || this.$route.name === 'er-dashboard'
        || this.$route.name === 'er-id' || this.$route.name === 'er-dashboard-generate-verification-code'
        || this.$route.name === 'er-dashboard-verification-codes'){
          return true;
        } else {
          return false;
        }
    },
  },

  computed: {
    getNesxtLanguageCode() {
      const nextLanguage = this.$i18n.locales.filter(locale => {
        return locale.code !== this.$i18n.locale;
      });
      return nextLanguage[0];
    },
    isDashboard() {
      if (this.$route.path.includes('dashboard')) {
        return true;
      }

      return false;
    }
  },
};
</script>

<style scoped>
.v-sheet {
  height: 70px !important;
}
::v-deep .v-sheet .v-toolbar__content {
  height: 70px !important;
}
.erxa-logo > img {
  width: 60px;
  background: #fff;
  border-radius: 50%;
  display: block;
}
.erxa-logo > svg > g {
  fill: var(--primary-color);
}
.erxa-cloud-svg {
  width: 100px;
  margin: 0 auto;
}
.erxa-cloud-svg img {
  width: 100%;
  height: auto;
}
.erxa-cloud-svg > svg > g {
  fill: var(--primary-color);
}
.navigation-drawer {
  z-index: var(--navigation-drawer-index);
}
.primary--text {
  color: #30bc8f !important;
}
a {
  text-decoration: none;
}
.container:last-child {
  page-break-after: avoid;
}
@media print {
  header {
    display: none;
  }
}
.hidden {
  display: none;
}
</style>
