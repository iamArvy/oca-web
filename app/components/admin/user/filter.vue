<script setup lang="ts">
import { useDebounceFn } from "@vueuse/core";
import { Search, Shield } from "@lucide/vue";
import { USER_ROLE_OPTIONS } from "~/constants";
import type { UserRole } from "~/enums/roles.enum";

interface PostFilter {
  q?: string;
  role?: UserRole;
  status?: string;
}

const { query } = useRoute();
const { push } = useRouter();
const filters = ref<PostFilter>({
  q: (query.q as string) || "",
  role: (query.role as UserRole) || "",
  status: (query.status as string) || "",
});

const applyFilters = useDebounceFn(() => {
  push({ name: "feeds", query: filters.value });
}, 300);

watch(filters, applyFilters, { deep: true });
</script>

<template>
  <AdminFilterButton>
    <div class="relative flex-1">
      <Search
        class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
      />
      <Input v-model="filters.q" placeholder="Search users..." class="pl-10" />
    </div>

    <Select v-model="filters.role">
      <SelectTrigger class="w-full sm:w-40">
        <Shield class="w-4 h-4 mr-2" />
        <SelectValue placeholder="Role" />
      </SelectTrigger>
      <SelectContent class="bg-card">
        <SelectItem value="all">All Roles</SelectItem>
        <SelectItem
          v-for="role in USER_ROLE_OPTIONS"
          :key="role.value"
          :value="role.value"
        >
          {{ role.label }}
        </SelectItem>
      </SelectContent>
    </Select>

    <!-- Status Filter -->
    <!-- <Select v-model="filters.status">
        <SelectTrigger class="w-full sm:w-36">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent class="bg-card">
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="published">Published</SelectItem>
          <SelectItem value="draft">Draft</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
        </SelectContent>
      </Select> -->
  </AdminFilterButton>
  <!-- <div class="bg-card rounded-2xl p-4 card-interactive">
    <div class="flex flex-col sm:flex-row gap-3"></div>
  </div> -->
</template>
