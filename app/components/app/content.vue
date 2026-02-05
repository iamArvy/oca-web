<template>
  <div class="container-lg -mt-32 relative z-10">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Main Content -->
      <div class="lg:col-span-2">
        <slot name="main" />
      </div>

      <!-- Sidebar -->
      <aside class="space-y-6">
        <slot name="sidebar" />
      </aside>
    </div>
    <slot />
  </div>
</template>