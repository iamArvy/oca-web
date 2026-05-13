<script setup lang="ts">
const { isMobile } = useMobile('lg')
</script>

<template>
  <div class="container-lg">
    <slot name="header" />

    <div class=" lg:grid grid-cols-3 gap-8 pb-12 items-start">
      <div class="lg:col-span-2 space-y-8">
        <slot v-if="isMobile" name="main" />
        <ScrollArea v-else class="h-500 pr-5">
          <slot name="main" />
        </ScrollArea>
      </div>

      <aside class="space-y-6 mt-3 lg:mt-0 ">
        <slot name="sidebar" />
        <AdComponent size="sidebar" />
        <WidgetsSocial />
      </aside>
    </div>

    <slot />
  </div>
</template>
