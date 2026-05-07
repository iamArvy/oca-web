<template>
  <div :class="`grid grid-cols-2 lg:grid-cols-3 gap-6 stagger-children`">
    <PostCardPlaceholder v-for="n in 6" :key="n" variant="grid" />
  </div>
</template>