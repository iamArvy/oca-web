<script setup lang="ts">
import { ref } from 'vue'
import { categories } from '@/lib/mocks'
import { APP_ROUTES } from '~/constants';
import { FolderOpen, ChevronDown, ChevronRight } from "lucide-vue-next";

const isMenuOpen = ref(false)
const isSearchOpen = ref(false)
</script>

<template>
  <header class="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
    <!-- Top Bar -->
    <div class="bg-gradient-hero text-primary-foreground py-2">
      <div class="container-lg flex justify-between items-center text-sm mx-auto">
        <span class="font-medium">Your source for African news & stories</span>
        <div class="hidden md:flex items-center gap-4">
          <NuxtLink to="/admin" class="hover:underline">Dashboard</NuxtLink>
          <span>|</span>
          <span>{{ new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) }}</span>
        </div>
      </div>
    </div>

    <!-- Main Header -->
    <div class="container-lg py-4 mx-auto">
      <div class="flex items-center justify-between gap-4">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-2">
          <AppLogo class="w-50" />
        </NuxtLink>

        <!-- Desktop Navigation -->
        <nav class="hidden lg:flex items-center gap-1">
          <!-- <NuxtLink v-for="category in categories.slice(0, 6)" :key="category.id"
            :to="APP_ROUTES.category.path(category.slug)"
            class="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors">
            {{ category.name }}
          </NuxtLink> -->
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
        <!-- <LayoutMegaMenu class="hidden lg:block" /> -->

        <!-- Actions -->
        <div class="flex items-center gap-2">
          <!-- Search -->
          <div :class="[isSearchOpen ? 'flex' : 'hidden md:flex', 'items-center']">
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
      <nav v-if="isMenuOpen" class="lg:hidden mt-4 pb-4 border-t border-border pt-4 animate-fade-in">
        <div class="flex flex-col gap-2">
          <NuxtLink v-for="category in categories" :key="category.id" :to="APP_ROUTES.category.path(category.slug)"
            class="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
            @click="isMenuOpen = false">
            {{ category.name }}
          </NuxtLink>
          <!-- <NuxtLink to="/admin"
            class="px-4 py-3 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors"
            @click="isMenuOpen = false">
            Dashboard
          </NuxtLink> -->
        </div>
      </nav>
    </div>
  </header>
</template>
