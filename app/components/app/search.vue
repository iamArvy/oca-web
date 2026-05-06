<script setup lang="ts">
const { q, search } = useSearchForm()
const { isMobile } = useMobile()
</script>

<template>
  <Popover v-if="isMobile">
    <PopoverTrigger as-child>
      <Button variant="ghost" size="icon">
        <Icon name="lucide:search" class="w-5 h-5" />
      </Button>
    </PopoverTrigger>

    <PopoverContent align="end" class="w-72 bg-card">
      <AppSearchInput />
    </PopoverContent>
  </Popover>

  <div v-else class="hidden md:flex items-center">
    <AppSearchInput />
  </div>
</template>