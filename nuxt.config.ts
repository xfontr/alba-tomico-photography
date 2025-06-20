export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: false },
  typescript: {
    typeCheck: true,
  },
  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/test-utils",
    "nuxt-i18n-micro",
  ],

  i18n: {
    locales: [{ code: "en", iso: "en-US", dir: "ltr" }],
    defaultLocale: "en",
    translationDir: "locales",
    meta: true,
    autoDetectLanguage: true,
  },

  runtimeConfig: {
    public: {
      imageKit: {
        id: "",
        privateKey: "",
        publicKey: "",
        baseUrl: "",
      },
    },
  },
});
