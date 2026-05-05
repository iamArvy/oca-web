<script setup lang="ts">
import { ref, computed } from 'vue'
import { ChevronLeft, ChevronRight, Radio, Volume2, Maximize2, Play } from 'lucide-vue-next'
import type { LiveSources } from '~/interfaces';

const props = defineProps<{
  sources?: LiveSources
}>()

const sources = computed(() => props.sources ?? [])

const activeId = ref(sources.value[0]?.id)

const active = computed(() => {
  return sources.value.find(s => s.id === activeId.value) ?? sources.value[0]
})

const scrollerRef = ref<HTMLDivElement | null>(null)

function scrollBy(dir: 1 | -1) {
  const el = scrollerRef.value
  if (!el) return
  el.scrollBy({
    left: dir * (el.clientWidth * 0.8),
    behavior: 'smooth',
  })
}
</script>

<template>
  <section v-if="active" class="space-y-3">
    <div class="h-100 md:h-125 rounded-2xl overflow-hidden">
      <iframe ref="iframeRef" :src="`${active.source}`" class="w-full h-full" frameborder="0" allow="encrypted-media"
        allowfullscreen />
    </div>

    <div class="relative">
      <div class="flex items-center justify-between mb-2 px-1">
        <h3 class="text-sm font-semibold flex items-center gap-2">
          <Radio class="w-4 h-4 text-primary" />
          Live channels
          <span class="text-xs text-muted-foreground">({{ sources.length }})</span>
        </h3>

        <div class="hidden md:flex gap-1">
          <button class="h-8 w-8 border rounded flex items-center justify-center" @click="scrollBy(-1)">
            <ChevronLeft class="w-4 h-4" />
          </button>
          <button class="h-8 w-8 border rounded flex items-center justify-center" @click="scrollBy(1)">
            <ChevronRight class="w-4 h-4" />
          </button>
        </div>
      </div>

      <div ref="scrollerRef"
        class="flex gap-3 overflow-x-auto snap-x snap-mandatory scroll-smooth p-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"">
        <div v-for="s in sources" :key="s.id" @click="activeId = s.id"
        class="group shrink-0 snap-start w-44 md:w-52 rounded-xl overflow-hidden border-2 transition-all text-left"
        :class="s.id === activeId ? 'border-primary shadow-lg scale-[1.02]' : 'border-transparent'">
        <div class="relative aspect-video">
          <img :src="`https://img.youtube.com/vi/${extractYouTubeId(s.source)}/maxresdefault.jpg`"
            class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />

          <span class="absolute top-1.5 left-1.5 px-1.5 py-0.5 bg-red-600 text-white text-[9px] rounded">
            Live
          </span>

          <span v-if="s.id === activeId" class="absolute inset-0 flex items-center justify-center">
            <span class="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
              <Play class="w-4 h-4 text-primary-foreground fill-primary-foreground ml-0.5" />
            </span>
          </span>
        </div>

        <div class="p-2.5 bg-card">
          <div class="flex items-center gap-1.5 mb-1">
            <span>{{ s.logo }}</span>
            <span class="text-xs font-semibold truncate">{{ s.name }}</span>
          </div>
          <p class="text-xs text-muted-foreground line-clamp-2">
            {{ s.description }}
          </p>
        </div>
      </div>
    </div>
    </div>
  </section>
</template>