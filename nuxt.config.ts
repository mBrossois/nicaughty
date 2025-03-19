// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-02-05',
  devtools: { enabled: true },
  css: [
    '~/assets/scss/main.scss',
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/scss/color.scss";'
        }
      }
    }
  },
  modules: ['@pinia/nuxt']
})