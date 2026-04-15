<script setup lang="ts">
const isSearchOpen = ref(false)
const { q, search } = useSearchForm()
const { isMobile } = useMobile()
</script>
<template>
  <div>
    <div class="items-center" :class="isSearchOpen ? 'flex' : 'hidden md:flex'">
      <div class="relative">
        <Icon name="lucide:search" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input v-model="q" placeholder="Search news..." @keydown.enter="search"
          class="pl-10 w-48 lg:w-64 bg-muted/50 border-0 focus-visible:ring-primary" />
      </div>
    </div>

    <!-- Toggle Search (Mobile) -->
    <Button variant="ghost" size="icon" class="md:hidden" @click="isSearchOpen = !isSearchOpen">
      <Icon name="lucide:search" class="w-5 h-5" />
    </Button>
  </div>
</template>