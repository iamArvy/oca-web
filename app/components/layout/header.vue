<script setup lang="ts">
import { ref } from 'vue'
import { categories } from '@/lib/mocks'
import { APP_ROUTES } from '~/constants';
import { FolderOpen, ChevronDown, ChevronRight } from "lucide-vue-next";

const isMenuOpen = ref(false)
const isSearchOpen = ref(false)

const { date, time } = useDateTime()
</script>

<template>
  <header class="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
    <!-- Top Bar -->
    <div class="bg-gradient-hero text-primary-foreground py-2">
      <div class="container-lg flex justify-between items-center text-sm mx-auto">
        <span class="font-medium">Your source for African news & stories</span>
        <div class="hidden md:flex items-center gap-4">
          <span>{{ date }}</span>
          <span>|</span>
          <span>{{ time }}</span>
        </div>
      </div>
    </div>

    <!-- Main Header -->
    <div class="container-lg py-4 mx-auto">
      <div class="flex items-center justify-between gap-4">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-2">
          <AppLogo class="w-20 sm:w-30 md:w-35 lg:w-40" />
        </NuxtLink>

        <!-- Desktop Navigation -->
        <nav class="hidden lg:flex items-center gap-1 flex-1 justify-end">
          <NuxtLink :to="APP_ROUTES.home.path" aria-label="Home"
            class="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
            active-class="text-foreground bg-muted">
            Home
          </NuxtLink>
          <LayoutMegaMenu2 :categories="categories">
            <FolderOpen class="w-4 h-4" />
            Categories
          </LayoutMegaMenu2>
          <NuxtLink :to="APP_ROUTES.contact.path" aria-label="Advertise with Us"
            class="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
            active-class="text-foreground bg-muted">
            Advertise with Us
          </NuxtLink>
        </nav>

        <!-- Actions -->
        <div class="flex items-center gap-2">
          <!-- Search -->
          <div class="items-center" :class="isSearchOpen ? 'flex' : 'hidden md:flex'">
            <div class="relative">
              <Icon name="lucide:search"
                class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search news..."
                class="pl-10 w-48 lg:w-64 bg-muted/50 border-0 focus-visible:ring-primary" />
            </div>
          </div>

          <!-- Toggle Search (Mobile) -->
          <Button variant="ghost" size="icon" class="md:hidden" @click="isSearchOpen = !isSearchOpen">
            <Icon name="lucide:search" class="w-5 h-5" />
          </Button>

          <AppTheme />

          <!-- Toggle Menu (Mobile) -->
          <Button variant="ghost" size="icon" class="lg:hidden" @click="isMenuOpen = !isMenuOpen">
            <Icon :name="isMenuOpen ? 'lucide:x' : 'lucide:menu'" class="w-5 h-5" />
          </Button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <LayoutMobileMenu :categories="categories" v-if="isMenuOpen" @close="isMenuOpen = false" />
    </div>
  </header>
</template>
