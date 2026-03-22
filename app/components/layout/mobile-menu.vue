<script setup lang="ts">
import { Flame, Home, Megaphone } from 'lucide-vue-next'
import { APP_ROUTES } from '~/constants';
import type { Topics } from '~/interfaces';

interface Props {
  topics: Topics
}

const props = defineProps<Props>()
</script>

<template>
  <Sheet>
    <SheetTrigger as-child>
      <Button variant="ghost" size="icon">
        <Icon name="lucide:menu" class="w-5 h-5" />
      </Button>
    </SheetTrigger>
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Topics</SheetTitle>
        <SheetDescription>
          Browse news by topics. Tap on a topic to view related articles.
        </SheetDescription>
      </SheetHeader>
      <Accordion type="multiple" class="w-full">
        <!-- <AccordionItem v-for="item in topics" :key="item.id" :value="item.id" class="border-none"> -->
        <LayoutMenuItem v-for="item in topics" :key="item.id" :item="item" />
        <!-- </AccordionItem> -->
      </Accordion>
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