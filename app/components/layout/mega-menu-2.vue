<script setup lang="ts">
import { ref, onBeforeUnmount } from "vue";
import { FolderOpen, ChevronDown, ChevronRight } from "lucide-vue-next";
// import { categories } from "@/lib/mocks"; // same data source
import { cn } from "@/lib/utils"; // optional, only if you use a class merging util
import { APP_ROUTES } from "~/constants";
import type { Topics } from "~/interfaces";

// interface Subcategory {
//   id: string;
//   name: string;
//   slug: string;
// }

// interface Category {
//   id: string;
//   name: string;
//   slug: string;
//   count: number;
//   subcategories?: Subcategory[];
// }

interface MegaMenuProps {
  topics?: Topics;
}

const props = defineProps<MegaMenuProps>();

const isOpen = ref(false);
const timeoutRef = ref<ReturnType<typeof setTimeout> | null>(null);

function handleMouseEnter() {
  if (timeoutRef.value) clearTimeout(timeoutRef.value);
  isOpen.value = true;
}

function handleMouseLeave() {
  timeoutRef.value = setTimeout(() => {
    isOpen.value = false;
  }, 150);
}

onBeforeUnmount(() => {
  if (timeoutRef.value) clearTimeout(timeoutRef.value);
});

</script>

<template>
  <div class="relative" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <!-- Categories Trigger -->
    <button class="flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg transition-colors" :class="isOpen
      ? 'text-primary bg-primary/10'
      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
      ">
      <slot />
      <ChevronDown class="w-4 h-4 transition-transform duration-200" :class="{ 'rotate-180': isOpen }" />
      <!-- <FolderOpen class="w-4 h-4" />
      Categories
      <ChevronDown class="w-4 h-4 transition-transform duration-200" :class="{ 'rotate-180': isOpen }" /> -->
    </button>

    <!-- Mega Menu Dropdown -->
    <div v-if="isOpen"
      class="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-200 bg-card border border-border rounded-2xl shadow-xl p-6 animate-in fade-in-0 zoom-in-95 duration-200 z-50"
      @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
      <div class="grid grid-cols-4 gap-6">
        <div v-for="category in topics" :key="category.id" class="space-y-3">
          <NuxtLink :to="APP_ROUTES.topic.path(category.slug)"
            class="font-display font-bold text-foreground hover:text-primary transition-colors flex items-center gap-2"
            @click="isOpen = false">
            {{ category.name }}
            <!-- <span class="text-xs text-muted-foreground font-normal">
              ({{ category.count }})
            </span> -->
          </NuxtLink>

          <ul v-if="category.children" class="space-y-1.5">
            <li v-for="sub in category.children" :key="sub.id">
              <NuxtLink :to="APP_ROUTES.topic.path(sub.slug)"
                class="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
                @click="isOpen = false">
                <ChevronRight class="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                {{ sub.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
