<script setup lang="ts">
const { currentTheme, updateTheme } = useTheme()
</script>

<template>
  <Button variant="ghost" size="icon" class="hover:bg-muted" aria-label="change-theme"
    @click="updateTheme(currentTheme === 'dark' ? 'light' : 'dark')">
    <Icon :name="currentTheme === 'dark' ? 'lucide:moon' : 'lucide:sun'" class="w-5 h-5" />
  </Button>
</template>