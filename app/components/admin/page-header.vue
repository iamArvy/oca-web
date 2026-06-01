<script setup lang="ts">
import { Plus } from "lucide-vue-next";

interface Props {
  title: string;
  subtitle: string;
  action?: {
    value: () => void;
    label: string;
  };
}

defineProps<Props>();
</script>
<template>
  <div class="flex items-center justify-between gap-4">
    <div>
      <h1 class="font-display text-xl md:text-3xl font-bold">{{ title }}</h1>
      <p class="text-sm md:text-base text-muted-foreground mt-1">
        {{ subtitle }}
      </p>
    </div>

    <div class="flex items-center space-x-2 md:space-x-4">
      <slot />
      <Button
        v-if="action"
        class="bg-primary hover:opacity-90 gap-2"
        @click="action.value"
      >
        <Plus class="w-4 h-4" />
        <span class="hidden md:block">{{ action.label }}</span>
      </Button>
    </div>
  </div>
</template>
