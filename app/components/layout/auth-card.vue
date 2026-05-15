<script setup lang="ts">
const { currentTheme } = useTheme()
</script>
<template>
  <Card class="border-border/50 shadow-xl">
    <CardHeader class="text-center pb-2">
      <AppLogo :variant="currentTheme === 'light' ? 'dark' : 'light'" class="w-40 mx-auto mb-4" />
      <CardTitle class="text-2xl font-display">
        <slot name="title" />
      </CardTitle>

      <CardDescription>
        <slot name="description" />
      </CardDescription>

    </CardHeader>

    <CardContent class="space-y-6">
      <slot />
    </CardContent>
  </Card>
</template>