<script setup lang="ts">
import type { ExternalSource } from "~/interfaces";
defineProps<ExternalSource>();
</script>
<template>
  <div class="bg-card rounded-2xl p-6 card-interactive">
    <h3 class="font-display text-lg font-bold mb-4">Source</h3>
    <div class="flex items-center gap-4">
      <div
        class="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-display text-xl"
      >
        {{ source.charAt(0) }}
      </div>
      <div>
        <p class="font-semibold">{{ source }}</p>
        <!-- <p class="text-sm text-muted-foreground">{{ role }}</p> -->
      </div>
    </div>
  </div>
</template>
