import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  
  devtools: { enabled: true },

  css: ["~/assets/css/tailwind.css", "~/assets/css/main.css"],

  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: [
        
        '@tiptap/extension-image',
        '@tiptap/extension-link',
        '@tiptap/extension-placeholder',
        '@tiptap/extension-youtube',
        '@tiptap/starter-kit',
        '@tiptap/vue-3',
        '@unovis/vue', 
        '@vee-validate/zod',
        '@vueuse/core',
        '@lucide/vue',
        'class-variance-authority',
        'clsx',
        'date-fns',
        'embla-carousel-autoplay',
        'embla-carousel-vue',
        'reka-ui',
        'tailwind-merge',
        'vee-validate',
        'vue-sonner',
        'zod',
      ]
    }
  },

  modules: [
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

  security: {
    headers: {
      crossOriginEmbedderPolicy: 'unsafe-none', // needed for YouTube iframe embeds
      contentSecurityPolicy: {
        'script-src': ["'self'", "'unsafe-inline'", 'https://www.googletagmanager.com', 'https://www.google-analytics.com'],
        'frame-src': ["'self'", 'https://www.youtube.com', 'https://www.youtube-nocookie.com'],
        'img-src': ["'self'", 'data:', 'https:'], // RSS feed images are allowlisted before rendering.
        'media-src': ["'self'", 'https://api.oneclickafrica.com'],
        'connect-src': ["'self'", process.env.NUXT_PUBLIC_API_BASE ?? '', 'https://www.google-analytics.com'],
      },
      crossOriginOpenerPolicy: 'same-origin',
      crossOriginResourcePolicy: 'cross-origin',
      originAgentCluster: '?1',
      referrerPolicy: 'strict-origin-when-cross-origin',
      xFrameOptions: 'DENY',
      permissionsPolicy: {
        camera: [],
        microphone: [],
        geolocation: [],
      },
    },
    removeLoggers: true,
  },

  sitemap: {
    sources: [
      '/api/__sitemap__/posts',
      '/api/__sitemap__/topics',
      '/api/__sitemap__/sources'
    ],
    exclude: [
      '/admin/**',
      '/social/**',
    ],
  },

  robots: {
    blockNonSeoBots: true,
    disallow: ['/social/*', '/admin/*'],
  },

  site: {
    name: "OneClickAfrica - Your premier source for African news",
    description:
      "Stay ahead with OneClickAfrica | Your premier source for African news, culture, and stories. Connecting the continent with the world.",
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

  routeRules: {
    '/admin': {
      redirect: {
        to: '/admin/dashboard',
        statusCode: 301,
      }
    },
  },
});
