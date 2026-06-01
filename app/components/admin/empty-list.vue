<script setup lang="ts">
interface Props {
  icon: Component;
  title: string;
  description: string;
  button?: {
    label: string;
    action: () => void;
  };
}

defineProps<Props>();
</script>
<template>
  <Empty>
    <EmptyHeader>
      <EmptyMedia variant="icon">
        <component :is="icon" />
      </EmptyMedia>
      <EmptyTitle>{{ title }}</EmptyTitle>
      <EmptyDescription>
        {{ description }}
      </EmptyDescription>
    </EmptyHeader>
    <EmptyContent>
      <div v-if="button" class="flex gap-2">
        <Button @click="button.action">{{ button.label }}</Button>
      </div>
    </EmptyContent>
  </Empty>
</template>
