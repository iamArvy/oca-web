<script setup lang="ts">
import { Menu } from 'lucide-vue-next'

const { isMobile } = useMobile('lg')
const { currentTheme } = useTheme()

</script>

<template>
  <header class="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
    <div class="bg-primary text-primary-foreground py-2">
      <div class="container-lg flex justify-between items-center text-sm mx-auto gap-4">
        <NewsTicker />
      </div>
    </div>

    <div class="container-lg py-4 mx-auto space-y-3">
      <div class="flex items-center justify-between gap-4">
        <NuxtLink to="/" class="flex items-center gap-2" aria-label="OneClick Africa">
          <AppLogo :variant="currentTheme === 'light' ? 'dark' : 'light'" class="w-20 sm:w-30 md:w-35 lg:w-40" />
        </NuxtLink>

        <div class="flex items-center gap-2">
          <!-- <AppSearch class="hidden md:flex" /> -->
          <AppTheme />
          <!-- <AppAccount /> -->
          <LayoutMobileMenu v-if="isMobile">
            <Button variant="ghost" size="icon">
              <Menu class="size-4" />
            </Button>
          </LayoutMobileMenu>
        </div>
      </div>
      <div class="flex justify-between gap-2">
        <LayoutMenu />
        <AppSearch v-if="!isMobile" class="hidden lg:flex max-w-70" />
      </div>
    </div>
  </header>
</template>
