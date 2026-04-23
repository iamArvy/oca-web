<template>
  <section class="py-8">
    <Skeleton class="w-30 h-20" />
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
      <PostCardPlaceholder v-for="n in 3" :key="n" />
    </div>
  </section>
</template>
