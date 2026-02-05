<script setup lang="ts">
import { ref, onBeforeUnmount } from "vue";
import { ChevronDown, ChevronRight } from "lucide-vue-next";
import { categories } from "@/lib/mocks"; // same data source
import { cn } from "@/lib/utils"; // optional: only if you’re already using it

const activeCategory = ref<string | null>(null);
const timeoutRef = ref<ReturnType<typeof setTimeout> | null>(null);

function handleMouseEnter(categoryId: string) {
  if (timeoutRef.value) clearTimeout(timeoutRef.value);
  activeCategory.value = categoryId;
}

function handleMouseLeave() {
  timeoutRef.value = setTimeout(() => {
    activeCategory.value = null;
  }, 150);
}

onBeforeUnmount(() => {
  if (timeoutRef.value) clearTimeout(timeoutRef.value);
});
</script>

<template>
  <nav class="hidden lg:flex items-center gap-1 relative" @mouseleave="handleMouseLeave">
    <!-- Top-level categories -->
    <div v-for="category in categories" :key="category.id" class="relative" @mouseenter="handleMouseEnter(category.id)">
      <NuxtLink :to="`/category/${category.slug}`"
        class="flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors" :class="activeCategory === category.id
          ? 'text-primary bg-primary/10'
          : 'text-muted-foreground hover:text-foreground hover:bg-muted'">
        {{ category.name }}
        <ChevronDown v-if="category.subcategories?.length" class="w-4 h-4 transition-transform duration-200"
          :class="{ 'rotate-180': activeCategory === category.id }" />
      </NuxtLink>
    </div>

    <!-- Mega Menu Dropdown -->
    <div v-if="activeCategory"
      class="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-2xl shadow-xl p-6 animate-in fade-in-0 zoom-in-95 duration-200 z-50"
      @mouseenter="handleMouseEnter(activeCategory)" @mouseleave="handleMouseLeave">
      <div class="grid grid-cols-4 gap-8">
        <div v-for="category in categories" :key="category.id" class="space-y-3"
          :class="{ 'opacity-50': activeCategory !== category.id }">
          <NuxtLink :to="`/category/${category.slug}`"
            class="font-display font-bold text-foreground hover:text-primary transition-colors flex items-center gap-2">
            {{ category.name }}
            <span class="text-xs text-muted-foreground font-normal">
              ({{ category.count }})
            </span>
          </NuxtLink>

          <ul v-if="category.subcategories" class="space-y-2">
            <li v-for="sub in category.subcategories" :key="sub.id">
              <NuxtLink :to="`/category/${category.slug}/${sub.slug}`"
                class="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group">
                <ChevronRight class="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                {{ sub.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <!-- Featured Section -->
      <div class="mt-6 pt-6 border-t border-border">
        <div class="flex items-center justify-between">
          <div>
            <span class="text-xs font-medium text-primary uppercase tracking-wider">
              Trending in {{
                categories.find((c) => c.id === activeCategory)?.name
              }}
            </span>
            <p class="text-sm text-muted-foreground mt-1">
              Explore the latest stories and updates
            </p>
          </div>
          <NuxtLink :to="`/category/${categories.find((c) => c.id === activeCategory)?.slug
            }`" class="text-sm font-medium text-primary hover:underline">
            View all articles →
          </NuxtLink>
        </div>
      </div>
    </div>
  </nav>
</template>
