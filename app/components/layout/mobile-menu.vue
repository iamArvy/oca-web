<script setup lang="ts">
import { Megaphone } from 'lucide-vue-next'
import { API_ROUTES, APP_ROUTES } from '~/constants';
import type { ApiListResponse, Topic } from '~/types';

const isOpen = ref(false)
const route = useRoute()

watch(() => route.fullPath, () => {
  isOpen.value = false
})

const { data: topics } = await useAPI<ApiListResponse<Topic>>(API_ROUTES.public.navigation.main)
const { isMobile } = useMobile('lg')
</script>

<template>
  <Sheet :open="isOpen" @update:open="val => isOpen = val">
    <SheetTrigger as-child>
      <slot />
    </SheetTrigger>
    <SheetContent>
      <SheetHeader class="mt-4.5">
        <AppSearch v-if="isMobile" class="mb-2 flex lg:hidden" />
        <SheetTitle>Topics</SheetTitle>
        <SheetDescription>
          Browse news by topics. Tap on a topic to view related articles.
        </SheetDescription>
      </SheetHeader>
      <div class="flex-1 overflow-y-auto scrollbar-hide">
        <Accordion v-if="topics" type="multiple" class="w-full">
          <LayoutMenuItem v-for="item in topics.data" :key="item.id" :item="item" />
        </Accordion>
      </div>
      <SheetFooter>
        <NuxtLink :to="APP_ROUTES.contact"
          class="flex items-center gap-3 px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors">
          <Megaphone class="w-5 h-5" />
          Advertise with Us
        </NuxtLink>
      </SheetFooter>
    </SheetContent>
  </Sheet>
</template>