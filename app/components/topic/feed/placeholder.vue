<template>
  <section class="py-8">
    <Skeleton class="w-30 h-5 mb-6" />
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 stagger-children">
      <PostCardPlaceholder v-for="n in 3" :key="n" />
    </div>
  </section>
</template>
