<template>
  <div class="container-lg">
    <slot name="header" />

    <div class="hidden lg:grid grid-cols-3 gap-8 pb-12 items-start">
      <div class="lg:col-span-2 space-y-8">
        <ScrollArea class="h-500 pr-5">
          <slot name="main" />
        </ScrollArea>
      </div>

      <aside class="space-y-6 mt-3 lg:mt-0 ">
        <slot name="sidebar" />
      </aside>
    </div>

    <div class="lg:hidden">
      <slot name="main" />
    </div>
    <slot />
  </div>
</template>
