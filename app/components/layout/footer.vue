<script setup lang="ts">
import { APP_ROUTES } from '~/constants';
import { socials } from '~/constants/socials';

const nav = [
  {
    label: 'Home',
    url: APP_ROUTES.home
  },
  {
    label: 'About',
    url: APP_ROUTES.about
  },
  {
    label: 'Privacy Policy',
    url: APP_ROUTES.privacy
  },
  {
    label: 'Contact',
    url: APP_ROUTES.contact
  },
]
</script>

<template>
  <footer class="bg-black text-white border-t-5 border-primary">
    <div class="container mx-auto pt-16 pb-10">
      <div class="flex flex-col items-center text-center space-y-4">
        <AppLogo class="w-60" />

        <p class="text-sm md:text-base max-w-md tracking-wide uppercase">
          Africa's premier digital hub for impactful news, entertainment, and business insights.
        </p>
        <ul class="flex gap-3 items-center justify-center">
          <li v-for="item in socials" :key="item.name">
            <NuxtLink :href="item.url" :aria-label="item.name"
              class="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-primary hover:text-white flex items-center justify-center transition-colors">
              <component :is="item.icon" class="w-4 h-4" />
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>


    <div class="border-t border-white/10">
      <div class="container-lg py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm mx-auto">
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
