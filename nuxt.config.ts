// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  
  devtools: { enabled: true },

  css: ["~/assets/css/tailwind.css", "~/assets/css/main.css"],

  vite: {
    plugins: [tailwindcss()],
  },

  modules: [
    "@nuxt/a11y",
    "@nuxt/icon",
    "@nuxt/image",
    "shadcn-nuxt",
    "nuxt-gtag",
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    'nuxt-schema-org',
    'nuxt-seo-utils',
    "nuxt-security",
  ],

  shadcn: {
    /**
     * Prefix for all the imported component.
     * @default "Ui"
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * Will respect the Nuxt aliases.
     * @link https://nuxt.com/docs/api/nuxt-config#alias
     * @default "@/components/ui"
     */
    componentDir: "@/components/ui",
  },

  sitemap: {
    enabled: true,
  },

  robots: {
    enabled: true,
  },

  site: {
    name: "OneClick Africa - Your premier source for African news",
    description:
      "Stay ahead with OneClick Africa | Your premier source for African news, culture, and stories. Connecting the continent with the world.",
    url: "https://oneclickafrica.com",
    ogUrl: "https://oneclickafrica.com",
    image: "https://oneclickafrica.com/og-image.png",
  },

  gtag: {
    id: process.env.GOOGLE_TAG_ID ?? "",
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || "http://localhost:3000",
      adsenseClient: process.env.ADSENSE_CLIENT,
      googleTagManagerId: process.env.GOOGLE_TAG_MANAGER_ID,
      linkedinPartnerId: process.env.LINKEDIN_PARTNER_ID,
    },
  },
});