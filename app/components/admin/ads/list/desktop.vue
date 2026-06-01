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
  <div class="bg-card rounded-2xl card-interactive overflow-hidden">
    <div class="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Ad</TableHead>
            <TableHead>Placement</TableHead>
            <TableHead>Content Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Start</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Ends</TableHead>
            <TableHead>Views</TableHead>
            <TableHead class="w-12.5" />
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow v-for="ad in ads" :key="ad.id" class="hover:bg-muted/50">
            <TableCell class="font-medium">
              <div class="flex items-center gap-2">
                <span class="line-clamp-1">{{ ad.title }}</span>
              </div>
            </TableCell>

            <TableCell>
              <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                :class="placementColor(ad.placement)">
                {{ ad.placement }}
              </span>
            </TableCell>

            <TableCell>
              <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                :class="contentTypeColor(ad.contentType)">
                {{ ad.contentType }}
              </span>
            </TableCell>

            <TableCell>
              <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                :class="statusColor(ad.status)">
                {{ ad.status }}
              </span>
            </TableCell>

            <TableCell class="text-muted-foreground">
              {{ new Date(ad.startDate).toLocaleDateString() }}
            </TableCell>

            <TableCell> {{ ad.duration }} {{ ad.durationUnit }} </TableCell>

            <TableCell class="text-muted-foreground">
              {{ ad.endDate ? new Date(ad.endDate).toLocaleDateString() : "—" }}
            </TableCell>

            <TableCell>
              {{ ad.clicks }}
            </TableCell>

            <TableCell>
              <AdminAdsListMenu :item="ad" @edit="$emit('edit', $event)" @delete="$emit('delete', $event)" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
</template>
