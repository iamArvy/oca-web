<script setup lang="ts">
import { User } from 'lucide-vue-next'
</script>

<template>
  <NuxtLink to="/login">
    <Button variant="ghost" size="icon" class="hover:bg-muted">
      <User class="w-5 h-5" />
    </Button>
  </NuxtLink>
</template>