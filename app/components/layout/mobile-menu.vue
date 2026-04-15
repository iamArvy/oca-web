<script setup lang="ts">
import { ChevronRight, Megaphone } from 'lucide-vue-next'
import { APP_ROUTES } from '~/constants';
import type { Topics } from '~/interfaces';

interface Props {
  topics: Topics
}

const props = defineProps<Props>()

const isOpen = ref(false)
const route = useRoute()

// Close sheet when route changes
watch(() => route.fullPath, () => {
  isOpen.value = false
})

const { isMobile } = useMobile();
</script>

<template>
  <Sheet :open="isOpen" @update:open="val => isOpen = val">
    <SheetTrigger as-child>
      <Button variant="outline" size="sm" class="text-xs">
        <template v-if="!isMobile">View Topics</template>
        <ChevronRight class="size-3" />
      </Button>
    </SheetTrigger>
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Topics</SheetTitle>
        <SheetDescription>
          Browse news by topics. Tap on a topic to view related articles.
        </SheetDescription>
      </SheetHeader>
      <div class="flex-1 overflow-y-auto scrollbar-hide">
        <Accordion type="multiple" class="w-full">
          <LayoutMenuItem v-for="item in topics" :key="item.id" :item="item" />
        </Accordion>
      </div>
      <SheetFooter>
        <NuxtLink :to="APP_ROUTES.contact.path"
          class="flex items-center gap-3 px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors">
          <Megaphone class="w-5 h-5" />
          Advertise with Us
        </NuxtLink>
      </SheetFooter>
    </SheetContent>
  </Sheet>
</template>