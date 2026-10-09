// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  srcDir: 'app',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxt/image', '@vueuse/nuxt'],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com'
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: ''
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Great+Vibes&family=Dancing+Script:wght@400;600;700&family=Inter:wght@300;400;500;600;700&display=swap'
        }
      ]
    }
  },
  colorMode: {
    preference: 'light',
    fallback: 'light'
  },
  typescript: {
    strict: true,
    typeCheck: false
  },

})
