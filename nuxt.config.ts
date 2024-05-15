
export default defineNuxtConfig({
  // devtools: { enabled: true },
  ssr: false,
  typescript: {
    shim: false,
  },
  app: {
    head: {
      title:
        "Spikeadmin Free Nuxt 3 Dashboard",
    },
    
  },
  build: {
    transpile: ["vuetify"],
  },
  nitro: {
    serveStatic: true,
  },
  sourcemap: { server: false, client: false },
  devServerHandlers: [],
  runtimeConfig: {
    public: {
      apiBase: process.env.API_URL, // can be overridden by NUXT_PUBLIC_API_BASE environment variable
    }
  },
});
