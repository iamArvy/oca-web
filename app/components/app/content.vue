<template>
  <div class="container-lg">
    <slot name="header" />

    <div class="block lg:grid grid-cols-3 gap-8 pb-12">
      <!-- Main Content -->
      <div class="lg:col-span-2 space-y-8">
        <slot name="main" />
      </div>

      <!-- Sidebar -->
      <aside class="space-y-6 hidden lg:block sticky top-40 self-start">
        <slot name="sidebar" />
      </aside>
    </div>

    <slot />
  </div>
</template>
