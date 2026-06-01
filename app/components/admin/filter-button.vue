<script setup lang="ts">
import { SlidersHorizontal } from "lucide-vue-next";

interface Emits {
  (e: "save" | "reset"): void;
}

defineEmits<Emits>();
</script>
<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button variant="outline" class="relative gap-2">
        <SlidersHorizontal class="w-4 h-4" />
        <span class="hidden md:block">Filters</span>

        <!-- <span
          v-if="activeFilters"
          class="w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center"
        >
          {{ activeFilters }}
        </span> -->
      </Button>
    </PopoverTrigger>

    <PopoverContent align="end" class="w-72 bg-card">
      <p class="text-sm font-medium mb-3">Filters</p>

      <div class="space-y-3">
        <slot />

        <Button
          variant="outline"
          size="sm"
          class="w-full"
          @click="$emit('reset')"
        >
          Reset Filters
        </Button>
      </div>
    </PopoverContent>
  </Popover>
</template>
