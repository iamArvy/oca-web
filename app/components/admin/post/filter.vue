<script setup lang="ts">
import { useDebounceFn } from "@vueuse/core";
import { Search, Filter as FilterIcon } from "lucide-vue-next";

interface PostFilter {
  q?: string;
  topic?: string;
}

const { query } = useRoute();
const { push } = useRouter();
const filters = ref<PostFilter>({
  q: (query.q as string) || undefined,
  topic: (query.topic as string) || undefined,
});

const applyFilters = useDebounceFn(() => {
  push({ name: "posts", query: filters.value });
}, 300);

watch(filters, applyFilters, { deep: true });

const { topics } = await useTopics();
</script>

<template>
  <AdminFilterButton>
    <div class="relative flex-1">
      <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <Input v-model="filters.q" placeholder="Search posts..." class="pl-10" />
    </div>

    <Select v-model="filters.topic">
      <SelectTrigger class="w-full sm:w-40">
        <FilterIcon class="w-4 h-4 mr-2" />
        <SelectValue placeholder="Topic" />
      </SelectTrigger>
      <SelectContent class="bg-card">
        <SelectItem value="all">All Topic</SelectItem>
        <SelectItem v-for="cat in topics" :key="cat.id" :value="cat.id">
          {{ cat.name }}
        </SelectItem>
      </SelectContent>
    </Select>
  </AdminFilterButton>
</template>
