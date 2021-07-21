export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  env: {
    chainRPC: 'https://bsc-dataseed.binance.org/', // https://data-seed-prebsc-1-s1.binance.org:8545/',
    walletAddress: '0xaAc36a40A132472772c2bC410fcC275cC1B1DF04', // '0x3362666084C1871fa8549Bbf431BB5C7f45b9961', //0xaAc36a40A132472772c2bC410fcC275cC1B1DF04
    useWhitelist: true,
    title: 'Are you ready for [DCIP?]',
    modalTitleDeposit: 'Deposit Succeeded!',
    unlockDescription: 'Until next unlock', // Until next unlock
    modalDescriptionDeposit:
      'Congratulations and thank you for your support in DCIP.',
    modalTitleWithdraw: 'Claim Succeeded!',
    modalDescriptionWithdraw: 'The DCIP funds have been added to your wallet.',
    rewards: [1625081711, 1627500911, 1630092911, 1632684911, 1635276911],
    minDeposit: 1,
    maxDeposit: 50,
    abi: 'privatesale', // alternatief: presale
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Private Sale | DCIP.finance', // of Presale | DCIP.finance
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
