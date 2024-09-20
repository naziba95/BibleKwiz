export default defineNuxtConfig({
  compatibilityDate: '2023-11-15', // Set to current date or recent past date

  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],

  devtools: { enabled: process.env.NODE_ENV !== 'production' },

  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.BASE_URL
    }
  },

  app: {
    head: {
      title: 'BibleKwiz',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'BibleKwiz App' }
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/icon?family=Material+Icons'
        }
      ]
    }
  },

  // Add these if needed
  ssr: true, // Enable server-side rendering

  // For Vercel deployment
  nitro: {
    preset: 'vercel'
  }
})