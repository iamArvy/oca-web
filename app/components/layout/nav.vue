<script setup lang="ts">
import { ChevronDown } from 'lucide-vue-next';


interface Props {
  label: string,
  value: string,
  active?: boolean,
  hasChildren?: boolean
}

const props = defineProps<Props>()
</script>

<template>
  <NuxtLink :to="props.value"
    class="text-sm whitespace-nowrap hover:font-medium text-foreground hover:text-primary transition-colors flex items-center w-full flex-1"
    :class="active ? 'text-primary font-medium' : ''" active-class="text-primary font-medium">
    {{ props.label }}
  </NuxtLink>
</template>