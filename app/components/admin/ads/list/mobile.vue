<script setup lang="ts">
import type {
  AdAdminData,
  AdStatus,
  AdPlacement,
  AdContentType,
} from "~/types";

interface Props {
  ads: AdAdminData[];
  placementColor: (placement: AdPlacement) => string;
  contentTypeColor: (contentType: AdContentType) => string;
  statusColor: (status: AdStatus) => string;
}

interface Emits {
  (e: "edit" | "delete", ad: AdAdminData): void;
}

defineProps<Props>();
defineEmits<Emits>();
</script>

<template>
  <div class="space-y-3">
    <div v-for="ad in ads" :key="ad.id" class="bg-card rounded-2xl p-4 card-interactive">
      <div class="flex items-start gap-3">
        <div class="flex-1 min-w-0">
          <p class="font-medium text-sm line-clamp-1">{{ ad.title }}</p>
          <div class="flex items-center gap-2 mt-1">
            <span class="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium"
              :class="placementColor(ad.placement)">
              {{ ad.placement }}
            </span>
            <span class="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium"
              :class="contentTypeColor(ad.contentType)">
              {{ ad.contentType }}
            </span>
            <span class="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium"
              :class="statusColor(ad.status)">
              {{ ad.status }}
            </span>
          </div>
        </div>
        <AdminAdsListMenu :item="ad" @edit="$emit('edit', $event)" @delete="$emit('delete', $event)" />
      </div>
    </div>
  </div>
</template>
