<script setup lang="ts">
import { posts } from '@/lib/mocks'
import { APP_ROUTES } from '~/constants';

const trendingPosts = posts.filter(p => p.trending).slice(0, 5)
const tickerContent = trendingPosts.map(p => p.title).join(' • ')
</script>

<template>
  <footer class="bg-gradient-dark text-primary-foreground">
    <!-- News Ticker -->
    <div class="bg-primary/20 py-3 overflow-hidden">
      <div class="container-lg flex items-center gap-4 mx-auto">
        <span class="bg-primary px-3 py-1 rounded-full text-xs font-bold shrink-0">
          TRENDING
        </span>
        <div class="ticker-wrapper flex-1">
          <div class="ticker-content">
            {{ tickerContent }} • {{ tickerContent }}
          </div>
        </div>
      </div>
    </div>

    <!-- Main Footer -->
    <div class="container-lg py-12 mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- About -->
        <div class="space-y-4">
          <AppLogo class="w-50" />
          <p class="text-primary-foreground/70 text-sm leading-relaxed">
            Your premier source for African news, culture, and stories.
            Connecting the continent with the world.
          </p>
          <div class="flex gap-3">
            <a href="#"
              class="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors">
              <Icon name="lucide:facebook" class="w-4 h-4" />
            </a>
            <a href="#"
              class="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors">
              <Icon name="lucide:twitter" class="w-4 h-4" />
            </a>
            <a href="#"
              class="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors">
              <Icon name="lucide:instagram" class="w-4 h-4" />
            </a>
            <a href="#"
              class="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors">
              <Icon name="lucide:youtube" class="w-4 h-4" />
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="space-y-4">
          <h4 class="font-display text-lg font-bold">Quick Links</h4>
          <ul class="space-y-2 text-sm">
            <li>
              <NuxtLink to="/" class="text-primary-foreground/70 hover:text-primary transition-colors">Home</NuxtLink>
            </li>
            <!-- <li>
              <NuxtLink :to="" class="text-primary-foreground/70 hover:text-primary transition-colors">
                Politics</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/category/business" class="text-primary-foreground/70 hover:text-primary transition-colors">
                Business</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/category/sports" class="text-primary-foreground/70 hover:text-primary transition-colors">
                Sports</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/category/entertainment"
                class="text-primary-foreground/70 hover:text-primary transition-colors">Entertainment</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/admin" class="text-primary-foreground/70 hover:text-primary transition-colors">Dashboard
              </NuxtLink>
            </li> -->
          </ul>
        </div>

        <!-- Top Stories -->
        <div class="space-y-4">
          <h4 class="font-display text-lg font-bold">Top Stories</h4>
          <ul class="space-y-3 text-sm">
            <li v-for="post in trendingPosts.slice(0, 4)" :key="post.id">
              <NuxtLink :to="APP_ROUTES.post.path(post.slug)"
                class="text-primary-foreground/70 hover:text-primary transition-colors line-clamp-2">
                {{ post.title }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Newsletter -->
        <div class="space-y-4">
          <h4 class="font-display text-lg font-bold">Newsletter</h4>
          <p class="text-primary-foreground/70 text-sm">
            Get the latest African news delivered to your inbox.
          </p>
          <div class="flex gap-2">
            <div class="relative flex-1">
              <Icon name="lucide:mail" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Enter your email"
                class="pl-10 bg-primary-foreground/10 border-0 text-primary-foreground placeholder:text-primary-foreground/50" />
            </div>
            <Button size="icon" class="bg-primary hover:bg-primary/90 shrink-0">
              <Icon name="lucide:arrow-right" class="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="border-t border-primary-foreground/10">
      <div
        class="container-lg py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/60 mx-auto">
        <p>© 2026 AfricaNews. All rights reserved.</p>
        <div class="flex gap-6">
          <a href="#" class="hover:text-primary transition-colors">Privacy Policy</a>
          <a href="#" class="hover:text-primary transition-colors">Terms of Service</a>
          <a href="#" class="hover:text-primary transition-colors">Contact</a>
        </div>
      </div>
    </div>
  </footer>
</template>
