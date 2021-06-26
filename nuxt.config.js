export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  env: {
    chainRPC: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    walletAddress: '0x17aab1e0745240ed1f4140f6fdd54485db8f6ec0',
    useWhitelist: false,
    title: 'Are you whitelisted for [the private sale?]',

    modalTitleDeposit: 'Deposit Succeeded!',
    modalDescriptionDeposit:
      'Congratulations and thank you for your support in DCIP.',

    modalTitleWithdraw: 'Claim Succeeded!',
    modalDescriptionWithdraw: 'Your DCIP funds are added to your wallet.',

    rewards: [1624996020],
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Presale | DCIP.finance',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      {
        charset: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        hid: 'description',
        name: 'description',
        content: '',
      },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico',
      },
    ],
  },

  googleFonts: {
    families: {
      Poppins: true,
    },
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',

    // https://composition-api.nuxtjs.org/
    '@nuxtjs/composition-api/module',

    // https://google-fonts.nuxtjs.org/
    '@nuxtjs/google-fonts',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  generate: {
    // choose to suit your project
    interval: 2000,
  },
}
