<script setup lang="ts">
import {
  AdStatus,
  AdPlacement,
  AdContentType,
  type AdAdminData,
} from "~/types";

interface Props {
  ads: AdAdminData[];
}

interface Emits {
  (e: "edit" | "delete", ad: AdAdminData): void;
}

defineProps<Props>();
defineEmits<Emits>();

const getStatusColor = (status?: AdStatus) => {
  switch (status) {
    case AdStatus.ACTIVE:
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
    case AdStatus.EXPIRED:
      return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400";
    case AdStatus.INACTIVE:
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const getPlacementColor = (placement: AdPlacement) => {
  switch (placement) {
    case AdPlacement.BANNER:
      return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
    case AdPlacement.FEED:
      return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
    case AdPlacement.SIDEBAR:
      return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const getContentTypeColor = (contentType: AdContentType) => {
  switch (contentType) {
    case AdContentType.IMAGE:
      return "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400";
    case AdContentType.VIDEO:
      return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
    case AdContentType.HTML:
      return "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const { isMobile } = useMobile('md');
</script>

<template>
  <AdminAdsListMobile v-if="isMobile" :ads="ads" :placement-color="getPlacementColor"
    :content-type-color="getContentTypeColor" :status-color="getStatusColor" @edit="$emit('edit', $event)"
    @delete="$emit('delete', $event)" />
  <AdminAdsListDesktop v-else :ads="ads" :placement-color="getPlacementColor" :content-type-color="getContentTypeColor"
    :status-color="getStatusColor" @edit="$emit('edit', $event)" @delete="$emit('delete', $event)" />
</template>
