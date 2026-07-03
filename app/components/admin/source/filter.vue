<script setup lang="ts">
import { useDebounceFn } from "@vueuse/core";
import { Search } from "@lucide/vue";

interface FeedFilter {
  q?: string;
}

const { query } = useRoute();
const { push } = useRouter();
const filters = ref<FeedFilter>({
  q: (query.q as string) || "",
});

const applyFilters = useDebounceFn(() => {
  push({ name: "live-sources", query: filters.value });
}, 300);

watch(filters, applyFilters, { deep: true });
</script>

<template>
  <AdminFilterButton>
    <div class="relative flex-1">
      <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <Input v-model="filters.q" placeholder="Search feeds..." class="pl-10" />
    </div>
  </AdminFilterButton>
</template>
