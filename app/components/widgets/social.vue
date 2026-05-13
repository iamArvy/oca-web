<script setup lang="ts">
const { onSubmit, isSubmitting, meta } = useNewsletterForm()
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ExternalLink,
} from 'lucide-vue-next'

interface SocialAccount {
  name: string
  url: string
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

const socials: SocialAccount[] = [
  {
    name: 'Facebook',
    url: 'https://web.facebook.com/people/OneclickAfrica-Limited/61582526614120',
    icon: Facebook,
    color: 'bg-[#1877F2]',
  },
  {
    name: 'X',
    url: 'https://x.com/1clickAfrica',
    icon: Twitter,
    color: 'bg-[#0A0A0A] dark:bg-[#E7E9EA]',
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/oneclickafrica',
    icon: Instagram,
    color: 'bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF]',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/company/oneclickafricalimited/',
    icon: Linkedin,
    color: 'bg-[#0A66C2]',
  },
  {
    name: 'TikTok',
    url: 'https://www.tiktok.com/@oneclickafrica',
    icon: TikTokIcon,
    color: 'bg-[#000000] dark:bg-[#ffffff]',
  },
]
</script>
<template>
  <div class="bg-black rounded-2xl p-6 text-primary-foreground space-y-3">
    <form @submit="onSubmit">
      <h3 class="font-display text-lg font-bold">Newsletter</h3>
      <p class="text-sm opacity-90 mb-4">Get daily news updates delivered to your inbox.</p>
      <div class="flex items-center gap-2">
        <FormField v-slot="{ componentField }" name="email">
          <FormItem>
            <FormControl>
              <div class="relative flex-1 w-full">
                <Icon name="lucide:mail" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white" />
                <Input placeholder="Enter your email" v-bind="componentField"
                  class="pl-10 bg-primary-foreground/10 border-0 text-white placeholder:text-primary-foreground/50" />
              </div>
            </FormControl>
          </FormItem>
        </FormField>
        <Button :disable="isSubmitting || !meta.valid" size="icon"
          class="rounded-lg bg-background text-black font-medium text-sm hover:bg-background/80 transition-opacity shrink-0"
          aria-label="submit-newsletter">
          <Icon name="lucide:arrow-right" class="w-4 h-4" />
        </Button>
      </div>
    </form>
    <div>
      <h3 class="font-display text-lg font-bold">Follow us</h3>
      <p class="text-sm opacity-90 mb-4">Stay up to date on our social media platforms.</p>
      <ul class="flex gap-3 items-center">
        <li v-for="item in socials" :key="item.name">
          <NuxtLink :href="item.url" :aria-label="item.name"
            class="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-primary hover:text-white flex items-center justify-center transition-colors">
            <component :is="item.icon" class="w-4 h-4" />
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>