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
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/hints",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/test-utils",
    "shadcn-nuxt",
    "@nuxtjs/seo",
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
  site: {
    name: "OneClick Africa",
    description:
      "Stay ahead with OneClick Africa | Your premier source for African news, culture, and stories. Connecting the continent with the world.",
    url: "https://oneclickafrica.com",
    image: "https://oneclickafrica.com/og-image.jpg",
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || "http://localhost:3000",
    },
    mailchimp: {
      apiKey: "", // will be overridden by environment variables
      serverPrefix: "",
      listId: "",
    },
  },
  // runtimeConfig: {
  //   public: {
  //     apiBase: process.env.API_BASE || 'http://localhost:3000/api',
  //   }
  // }
});
