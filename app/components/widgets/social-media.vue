<script setup lang="ts">
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ExternalLink,
} from 'lucide-vue-next'

interface SocialAccount {
  name: string
  handle: string
  url: string
  followers: string
  icon: any
  color: string
}

const TikTokIcon = defineComponent({
  name: 'TikTokIcon',
  props: {
    class: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    return () =>
      h(
        'svg',
        {
          viewBox: '0 0 24 24',
          fill: 'currentColor',
          class: props.class,
        },
        [
          h('path', {
            d: 'M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.83 2.89 2.89 0 0 1-2.88-2.89 2.89 2.89 0 0 1 2.88-2.89c.3 0 .58.06.85.14V9.4a6.33 6.33 0 0 0-.85-.06A6.26 6.26 0 0 0 3.23 15.6a6.26 6.26 0 0 0 6.26 6.26 6.26 6.26 0 0 0 6.26-6.26V8.35a8.17 8.17 0 0 0 4.84 1.58V6.69h-.01z',
          }),
        ],
      )
  },
})

const socialAccounts: SocialAccount[] = [
  {
    name: 'Facebook',
    handle: '@OneclickAfrica-Limited',
    url: 'https://web.facebook.com/people/OneclickAfrica-Limited/61582526614120',
    followers: '245K',
    icon: Facebook,
    color: 'bg-[#1877F2]',
  },
  {
    name: 'X',
    handle: '@1clickAfrica',
    url: 'https://x.com/1clickAfrica',
    followers: '189K',
    icon: Twitter,
    color: 'bg-[#0A0A0A] dark:bg-[#E7E9EA]',
  },
  {
    name: 'Instagram',
    handle: '@oneclickafrica',
    url: 'https://www.instagram.com/oneclickafrica',
    followers: '312K',
    icon: Instagram,
    color: 'bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF]',
  },
  {
    name: 'LinkedIn',
    handle: '@Oneclick Africa',
    url: 'https://www.linkedin.com/company/oneclickafricalimited/',
    followers: '98K',
    icon: Linkedin,
    color: 'bg-[#0A66C2]',
  },
  {
    name: 'TikTok',
    handle: '@oneclickafrica',
    url: 'https://www.tiktok.com/@oneclickafrica',
    followers: '456K',
    icon: TikTokIcon,
    color: 'bg-[#000000] dark:bg-[#ffffff]',
  },
]
</script>

<template>
  <div class="bg-card rounded-2xl p-6 card-interactive">
    <h3 class="font-display text-lg font-bold mb-4 flex items-center gap-2">
      <ExternalLink class="w-5 h-5 text-primary" />
      Follow Us
    </h3>

    <div class="space-y-3">
      <NuxtLink v-for="account in socialAccounts" :key="account.name" :href="account.url" target="_blank"
        rel="noopener noreferrer"
        class="flex items-center gap-3 p-2.5 rounded-xl hover:bg-muted transition-colors group">
        <div :class="[
          'w-9 h-9 rounded-lg flex items-center justify-center text-white shrink-0',
          account.color,
        ]">
          <component :is="account.icon" class="w-4 h-4" />
        </div>

        <div class="flex-1 min-w-0">
          <p class="text-sm font-semibold group-hover:text-primary transition-colors">
            {{ account.name }}
          </p>
          <p class="text-xs text-muted-foreground">
            {{ account.handle }}
          </p>
        </div>

        <!-- <span class="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-full shrink-0">
          {{ account.followers }}
        </span> -->
      </NuxtLink>
    </div>
  </div>
</template>