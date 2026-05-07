<script setup lang="ts">
const { q, search } = useSearchForm()

</script>

<template>
  <div class="relative w-full">
    <Icon name="lucide:search" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

    <Input v-model="q" @keydown.enter="search" placeholder="Search news..."
      class="pl-10 w-full bg-muted/50 border-0 focus-visible:ring-primary" />
  </div>
</template>