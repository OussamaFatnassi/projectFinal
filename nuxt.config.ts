// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxthq/ui'],
  // https://nuxt.com/docs/migration/runtime-config#runtime-config
  runtimeConfig: {
    // Config within public will be also exposed to the client
    public: {
      TOKEN: process.env.TOKEN,
    }
  },
})
