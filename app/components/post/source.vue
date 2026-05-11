<script setup lang="ts">
import { APP_ROUTES } from "~/constants";
import type { Feed } from "~/interfaces";
defineProps<Feed>();
</script>
<template>
  <div class="bg-card rounded-2xl p-6 card-interactive">
    <h2 class="font-display text-lg font-bold mb-4">Post Source</h2>
    <div class="flex items-center gap-4">
      <!-- <div
        class="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-display text-xl">
        {{ name.charAt(0) }}
      </div> -->
      <Avatar>
        <AvatarImage :src="image ?? ''" :alt="name" />
        <AvatarFallback>{{ getInitials(name) }}</AvatarFallback>
      </Avatar>
      <NuxtLink :to="APP_ROUTES.source.path(slug)">
        <p class="font-semibold">{{ name }}</p>
        <!-- <p class="text-sm text-muted-foreground">{{ role }}</p> -->
      </NuxtLink>
    </div>
  </div>
</template>
