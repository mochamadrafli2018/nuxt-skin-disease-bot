export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Skin-Diseases : Chatbot',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { 
        rel: 'icon',
        type: 'image/x-icon',
        href: 'https://clipground.com/images/programming-logo-clipart-5.jpg'
      },
      {
        rel: 'apple-touch-icon',
        type: 'image/x-icon',
        href: 'https://clipground.com/images/programming-logo-clipart-5.jpg'
      },
      {
        rel: 'stylesheet', 
        href:'https://fonts.googleapis.com/css2?family=Open+Sans&display=swap'
      },
      {
        rel: 'stylesheet', 
        href:'https://fonts.googleapis.com/css2?family=Poppins&display=swap' 
      },
      {
        rel: 'stylesheet', 
        href:'https://fonts.googleapis.com/css2?family=Quicksand:wght@600&display=swap'
      },
      {
        rel: 'stylesheet', 
        href:'https://fonts.googleapis.com/css2?family=Roboto&display=swap' 
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    // tailwind css
    '@/assets/css/main.css',
    // 'bootstrap/dist/css/bootstrap.css',
    // 'bootstrap-vue/dist/bootstrap-vue.css',
    'bootstrap-icons/font/bootstrap-icons.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // tailwind css
    '@nuxt/postcss8',
    // vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // axios nuxt
    // '@nuxtjs/axios',
    'bootstrap-vue/nuxt',
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },
}
