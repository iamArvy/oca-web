<script setup lang="ts">

interface PageHeader {
  title: string
  description: string[]
}

interface SectionContent {
  type: 'text' | 'list',
  value: string | string[]
}

interface Section {
  title: string,
  content: SectionContent[]
}

interface Props {
  header: PageHeader,
  sections: Section[]
}

defineProps<Props>()
</script>

<template>
  <main class="container-lg mx-auto py-12 max-w-4xl">
    <h1 class="font-display text-4xl md:text-5xl font-bold mb-6">
      {{ header.title }}
    </h1>
    <div class="text-lg text-muted-foreground mb-12 leading-relaxed space-y-3">
      <p v-for="paragraph in header.description">
        {{ paragraph }}
      </p>
    </div>

    <div class="space-y-8">
      <section v-for="{ title, content } in sections">
        <h2 class="font-display text-2xl font-bold mb-4">{{ title }}</h2>
        <div class="space-y-2 text-muted-foreground leading-relaxed">
          <template v-for="{ type, value } in content">
            <p v-if="type === 'text' && typeof (value) === 'string'">
              {{ value }}
            </p>
            <ul v-else>
              <li class="list-disc" v-for="line in value">
                {{ line }}
              </li>
            </ul>
          </template>
        </div>
      </section>
    </div>
  </main>
</template>