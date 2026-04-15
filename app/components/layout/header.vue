<script setup lang="ts">
import { User } from 'lucide-vue-next'
import { ref } from 'vue'
import { API_ROUTES } from '~/constants'
import type { ApiListResponse, Posts } from '~/interfaces'

const { topics } = await useTopics()
const isSearchOpen = ref(false)

// const { date, time } = useDateTime()

const router = useRouter()
const { q, search } = useSearchForm()
const { data: latestNews } = useAPI<ApiListResponse<Posts>>(API_ROUTES.posts.path, { query: { limit: 20 } })
const { loggedIn } = useUserSession()
</script>

<template>
  <header class="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
    <!-- Top Bar -->
    <div class="bg-primary text-primary-foreground py-2">
      <div class="container-lg flex justify-between items-center text-sm mx-auto gap-4">
        <NewsTicker v-if="latestNews" :posts="latestNews?.data ?? []" />
        <!-- <div class="hidden md:flex items-center gap-2 flex-1">
          <span class="w-25">{{ date }}</span>
          <span>|</span>
          <span class="w-20">{{ time }}</span>
        </div> -->
      </div>
    </div>

    <!-- Main Header -->
    <div class="container-lg py-4 mx-auto space-y-3">
      <div class="flex items-center justify-between gap-4">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-2">
          <AppLogo class="w-20 sm:w-30 md:w-35 lg:w-40" />
        </NuxtLink>

        <!-- Actions -->
        <div class="flex items-center gap-2">
          <!-- Search -->
          <div class="items-center" :class="isSearchOpen ? 'flex' : 'hidden md:flex'">
            <div class="relative">
              <Icon name="lucide:search"
                class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input v-model="q" placeholder="Search news..." @keydown.enter="search"
                class="pl-10 w-48 lg:w-64 bg-muted/50 border-0 focus-visible:ring-primary" />
            </div>
          </div>

          <!-- Toggle Search (Mobile) -->
          <Button variant="ghost" size="icon" class="md:hidden" @click="isSearchOpen = !isSearchOpen">
            <Icon name="lucide:search" class="w-5 h-5" />
          </Button>

          <AppTheme />
          <AppAccount v-if="loggedIn" />
          <NuxtLink v-else to="/login">
            <Button variant="ghost" size="icon" class="hover:bg-muted">
              <User class="w-5 h-5" />
            </Button>
          </NuxtLink>

          <!-- <LayoutMobileMenu :topics="topics" /> -->
        </div>
      </div>
      <LayoutMenu :topics="topics" />
    </div>

  </header>
</template>
