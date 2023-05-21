export default {
  // Global page headers: https://go.nuxtjs.dev/config-head

  head: {
    title: 'Erxa',
    htmlAttrs: { lang: 'ar' },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'theme-color', content: '#0e6998' },
      { name: 'msapplication-TileColor', content: '#0e6998' },
      { name: 'theme-color', content: '#0e6998' },
      {
        hid: 'description',
        name: 'description',
        content: 'Erxa Web Application For Online Prescription',
      },
    ],
    link: [
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/favicon/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon/favicon-16x16.png',
      },
      {
        rel: 'mask-icon',
        href: '/favicon/safari-pinned-tab.svg',
        color: '#0e6998',
      },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon/erxafavicon.ico' },
    ],
  },

  // global loading component
  loading: '~/components/layout/GlobalLoading.vue',

  // Loading Indicator for SSG firt load
  loadingIndicator: {
    name: 'fading-circle',
    color: '#0e6998',
    background: 'white',
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/styles/main.css', '~/assets/styles/overrides.sass'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{ src: '~/plugins/i18n.js' }, {src: '~/plugins/event-bus.js'},],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // send usage data https://git.io/nuxt-telemetry
  telemetry: false,

  // to generate static site
  target: 'static',

  // to show 404 page in netlify
  generate: {
    fallback: true,
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
    '@nuxtjs/svg',
    '@nuxtjs/pwa',
    '@nuxtjs/google-analytics',
    '@nuxtjs/device',
    '@nuxtjs/dotenv',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/i18n',
    '@nuxt/http',
    '@nuxtjs/sitemap',
    '@nuxtjs/sentry',
    '@nuxtjs/dayjs',
    '@nuxtjs/axios',
    '@nuxtjs/toast',
    '@nuxtjs/auth',
  ],

  // router: {
  //   middleware: ['isAuth'],
  // },

  // Dayjs options
  dayjs: {
    locales: ['en', 'ar'],
    defaultLocale: 'ar',
    plugins: ['relativeTime'],
  },

  // Sentry options
  sentry: {
    dsn: 'https://036ecbdc80494605b4084f430c30f188@o254360.ingest.sentry.io/6201102',
    disabled: process.env.NODE_ENV !== 'production',
    lazy: true,
    disableServerSide: true,
  },

  // Google analytics options
  googleAnalytics: {
    id: 'G-JG3229LHBB',
    autoTracking: {
      screenview: true,
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    treeShake: true,
    defaultAssets: false, // to prevent load assets like mdi from CDN
    customVariables: ['~/assets/styles/variables.scss'],
    icons: {
      iconfont: 'mdiSvg',
    },
    theme: {
      dark: false,
      themes: {
        light: {
          primary: {
            base: '#0e6998',
            lighten5: '#FDF4F6',
            lighten4: '#F8D5DB',
          },
        },
      },
    },
  },

  // Toast config
  toast: {
    position: 'top-right',
    duration: 5000,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  // sitemap configuration
  sitemap: {
    hostname: 'https://erxa.io',
    path: '/sitemap.xml',
  },

  //  i18n configuration
  i18n: {
    baseUrl: 'https://erxa.io',
    vueI18nLoader: true,
    locales: [
      {
        code: 'en',
        file: 'en',
        iso: 'en-US',
        name: 'English',
      },
      {
        rtl: true, // custom property
        code: 'ar',
        file: 'ar',
        iso: 'ar-KW',
        name: 'عربي',
      },
    ],
    strategy: 'no_prefix',
    defaultLocale: 'en',
    vueI18n: {
      fallbackLocale: 'en',
    },
    detectBrowserLanguage: true,
  },

  // pwa configuration
  pwa: {
    icon: {
      fileName: 'images/Logo/erxa_two.png',
    },
    workbox: {
      /* workbox options */
      offline: false, // prevent to cache all routes
      runtimeCaching: [
        { urlPattern: '/' },
        { urlPattern: '/en' },
        { urlPattern: '/contact-us' },
        { urlPattern: '/en/contact-us' },
        { urlPattern: '/privacy-policy' },
        { urlPattern: '/en/privacy-policy' },
      ],
    },
    manifest: {
      name: 'erxa',
      short_name: 'erxa',
      description: 'Digital Prescription',
      start_url: '/',
      theme_color: '#0e6998',
      background_color: '#0e6998',
      useWebmanifestExtension: false,
    },
  },

  // HTTP options here
  // use non $-prefixed functions to get full response
  // $http.get() instead $http.$get()
  http: {
    baseURL: (() => {
      if(process.env.BASE_URL === 'https://test.erxa.io/'){
        return process.env.STAGING_API
      }
      else if(process.env.NODE_ENV === 'development'){
        return process.env.STAGING_API
      }
      else {
        return process.env.LIVE_API
      }
    })(),
    browserBaseURL: (() => {
      if(process.env.BASE_URL === 'https://test.erxa.io/'){
        return process.env.STAGING_API
      }
      else if(process.env.NODE_ENV === 'development'){
        return process.env.STAGING_API
      }
      else {
        return process.env.LIVE_API
      }
    })(),
    // baseURL: 'https://stagingapi.erxa.io/',
    // browserBaseURL: 'https://stagingapi.erxa.io/',
  },

  // axios setup
  axios: {
    baseURL: (() => {
      if(process.env.BASE_URL === 'https://test.erxa.io/'){
        return process.env.STAGING_API
      }
      else if(process.env.NODE_ENV === 'development'){
        return process.env.STAGING_API
      }
      else {
        return process.env.LIVE_API
      }
    })(),
    browserBaseURL: (() => {
      if(process.env.BASE_URL === 'https://test.erxa.io/'){
        return process.env.STAGING_API
      }
      else if(process.env.NODE_ENV === 'development'){
        return process.env.STAGING_API
      }
      else {
        return process.env.LIVE_API
      }
    })(),
    // baseURL: 'https://stagingapi.erxa.io/',
    // browserBaseURL: 'https://stagingapi.erxa.io/',
  },
};
