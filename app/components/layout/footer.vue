<script setup lang="ts">
import { API_ROUTES, APP_ROUTES } from '~/constants';
import { SortPostOptions, type ApiListResponse, type Post } from '~/interfaces';

const socials = [
  {
    label: '',
    value: '',
    icon: 'lucide:facebook',
    url: 'https://web.facebook.com/people/OneclickAfrica-Limited/61582526614120'
  },
  {
    label: '',
    value: '',
    icon: 'lucide:twitter',
    url: 'https://x.com/1clickAfrica'
  },
  {
    label: '',
    value: '',
    icon: 'lucide:instagram',
    url: 'https://www.instagram.com/oneclickafrica'
  },
  {
    label: '',
    value: '',
    icon: 'lucide:linkedin',
    url: 'https://www.linkedin.com/company/oneclickafricalimited/'
  }
]

const nav = [
  {
    label: 'Home',
    url: APP_ROUTES.home.path
  },
  {
    label: 'About',
    url: APP_ROUTES.about.path
  },
  {
    label: 'Privacy Policy',
    url: APP_ROUTES.privacy.path
  },
  {
    label: 'Contact',
    url: APP_ROUTES.contact.path
  },
]
const { onSubmit, isSubmitting } = useNewsletterForm()

const { data: editorPicks } = useAPI<ApiListResponse<Post>>(API_ROUTES.posts.path, { query: { collection: 'editor-picks', limit: 4 } })
const { data: hotClicks } = useAPI<ApiListResponse<Post>>(API_ROUTES.posts.path, { query: { sort: SortPostOptions.VIEWS, days: 1, limit: 4 } })
</script>

<template>
  <footer class="bg-black text-white">
    <div class="container-lg py-12 mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div class="col-span-3 grid md:grid-cols-2 gap-8 ">
          <WidgetsFooter v-if="editorPicks" label="Editor's Picks" :posts="editorPicks?.data?.slice(0, 5) ?? []" />
          <WidgetsFooter v-if="hotClicks" label="Hot Clicks" :posts="hotClicks?.data?.slice(0, 5) ?? []" />
        </div>

        <div class="space-y-4">
          <p class="font-display text-lg font-bold">Newsletter</p>
          <p class="text-white/70 text-sm">
            Get the latest African news delivered to your inbox.
          </p>
          <form @submit.prevent="onSubmit" class="flex gap-2" action="">
            <FormField v-slot="{ componentField }" name="email">
              <FormItem>
                <FormControl>
                  <div class="relative flex-1">
                    <Icon name="lucide:mail" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white" />
                    <Input placeholder="Enter your email" v-bind="componentField"
                      class="pl-10 bg-primary-foreground/10 border-0 text-white placeholder:text-primary-foreground/50" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <Button :disable="isSubmitting" size="icon" class="bg-primary hover:bg-primary/90 shrink-0"
              aria-label="submit-newsletter">
              <Icon name="lucide:arrow-right" class="w-4 h-4" />
            </Button>
          </form>
          <div class="flex gap-3">
            <NuxtLink v-for="item in socials" :key="item.label" :href="item.url" :aria-label="item.label"
              class="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-primary hover:text-white flex items-center justify-center transition-colors">
              <Icon :name="item.icon" class="w-4 h-4" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <div class="border-t border-white/10">
      <div
        class="container-lg py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60 mx-auto">
        <p>© {{ new Date().getFullYear().toString() }} OneClick Africa. All rights reserved.</p>
        <div class="flex gap-6">
          <NuxtLink v-for="item in nav" :to="item.url" class="hover:text-primary transition-colors">
            {{ item.label }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>
