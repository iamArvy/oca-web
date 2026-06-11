<script setup lang="ts">
import { API_ROUTES } from '~/constants';
import type { ApiListResponse } from '~/types';

const { data: ticker } = useAPI<ApiListResponse<string>>(API_ROUTES.public.widgets.ticker)

const tickerContent = ticker.value?.data.map(p => p).join(' • ')
</script>

<template>
  <div class="overflow-hidden">
    <div class="flex items-center gap-4 mx-auto">
      <span class="bg-black text-primary px-3 py-1 rounded-full text-xs font-bold shrink-0">
        TRENDING
      </span>
      <div class="ticker-wrapper flex-1">
        <div class="ticker-content text-black">
          {{ tickerContent }} • {{ tickerContent }}
        </div>
      </div>
    </div>
  </div>
</template>