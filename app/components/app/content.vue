<template>
  <div class="container-lg">
    <slot name="header" />

    <div class="block lg:grid grid-cols-3 gap-8 pb-12  items-start">
      <!-- Main Content -->
      <div class="lg:col-span-2 space-y-8">
        <slot name="main" />
      </div>

      <!-- Sidebar -->
      <aside class="hidden lg:block sticky top-6 self-start space-y-6">
        <slot name="sidebar" />
      </aside>
    </div>

    <slot />
  </div>
</template>
