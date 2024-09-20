// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
  devtools: { enabled: false },
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.BASE_URL
    }
  },
  app: {
    head: {
      title: 'BibleKwiz',
      meta: [
        { name: 'description', content: 'Everything about Nuxt-3' }
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/icon?family=Material+Icons'
        }
      ]
    }
  },

})
