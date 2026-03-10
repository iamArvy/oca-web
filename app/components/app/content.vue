<template>
  <div class="container-lg">
    <slot name="header" />

    <div class="block lg:grid grid-cols-3 gap-8 pb-12 items-start">
      <div class="lg:col-span-2 space-y-8">
        <slot name="main" />
      </div>

      <aside class="space-y-6 mt-3 lg:mt-0 ">
        <slot name="sidebar" />
      </aside>
    </div>

    <slot />
  </div>
</template>
