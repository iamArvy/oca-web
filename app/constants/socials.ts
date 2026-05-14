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

export const socials: SocialAccount[] = [
  {
    name: 'Facebook',
    url: 'https://web.facebook.com/people/OneclickAfrica-Limited/61582526614120',
    icon: Facebook,
  },
  {
    name: 'X',
    url: 'https://x.com/1clickAfrica',
    icon: Twitter,
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/oneclickafrica',
    icon: Instagram,
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/company/oneclickafricalimited/',
    icon: Linkedin,
  },
  {
    name: 'TikTok',
    url: 'https://www.tiktok.com/@oneclickafrica',
    icon: TikTokIcon,
  },
]