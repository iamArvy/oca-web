<script setup lang="ts">
import type { Categories } from '~/types';

interface Props {
  label: string,
  value: string,
  active?: boolean
}

const props = defineProps<Props>()
</script>

<template>
  <NuxtLink :to="props.value"
    class="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors flex items-center"
    :class="active ? 'bg-muted' : ''" active-class="bg-muted"> {{ props.label }}
  </NuxtLink>
</template>