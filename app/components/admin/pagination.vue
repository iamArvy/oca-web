<script setup lang="ts">
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import type { PaginationMeta } from "~/types";

interface Props {
  meta: PaginationMeta;
}

const props = defineProps<Props>();
const emit = defineEmits<{ (e: "change", page: number): void }>();

// Default values with safe fallbacks
const page = computed(() => props.meta.page ?? 1);
const limit = computed(() => props.meta.limit ?? 10);
const total = computed(() => props.meta.total ?? 0);
const totalPages = computed(
  () => props.meta.total_pages ?? Math.ceil(total.value / limit.value),
);

// Handle click on page number
function handlePageChange(newPage: number) {
  if (newPage !== page.value) emit("change", newPage);
}

// Next / Prev
function handleNext() {
  if (page.value < totalPages.value) emit("change", page.value + 1);
}
function handlePrev() {
  if (page.value > 1) emit("change", page.value - 1);
}
</script>

<template>
  <Pagination v-slot="{ page: currentPage }" :items-per-page="limit" :total="total" :default-page="page">
    <PaginationContent v-slot="{ items }">
      <!-- Previous -->
      <PaginationPrevious :disabled="page <= 1" @click="handlePrev" />

      <!-- Page Numbers -->
      <template v-for="(item, index) in items" :key="index">
        <PaginationItem v-if="item.type === 'page'" :value="item.value" :is-active="item.value === currentPage"
          @click="handlePageChange(item.value)">
          {{ item.value }}
        </PaginationItem>
      </template>

      <!-- Ellipsis -->
      <PaginationEllipsis />

      <!-- Next -->
      <PaginationNext :disabled="page >= totalPages" @click="handleNext" />
    </PaginationContent>
  </Pagination>
</template>
