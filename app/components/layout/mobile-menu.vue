<script setup lang="ts">
import { Flame, Home, Megaphone } from 'lucide-vue-next'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import type { Categories } from '~/types';
import { APP_ROUTES } from '~/constants';

interface Props {
  onClose: () => void,
  categories: Categories
}

const props = defineProps<Props>()
</script>

<template>
  <nav class="lg:hidden mt-4 pb-4 border-t border-border pt-4 animate-fade-in">
    <!-- Hot Topics Link -->
    <NuxtLink :to="APP_ROUTES.home.path"
      class="flex items-center gap-3 px-4 py-3 text-sm font-medium text-accent hover:bg-accent/10 rounded-lg transition-colors mb-2"
      @click="props.onClose">
      <Home class="w-5 h-5" />
      Home
    </NuxtLink>
    <!-- <NuxtLink to="/hot-topics"
      class="flex items-center gap-3 px-4 py-3 text-sm font-medium text-accent hover:bg-accent/10 rounded-lg transition-colors mb-2"
      @click="props.onClose">
      <Flame class="w-5 h-5" />
      Hot Topics
    </NuxtLink> -->

    <!-- Categories Header -->
    <div class="px-4 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
      Categories
    </div>

    <!-- Accordion for categories -->
    <Accordion type="single" collapsible class="w-full">
      <AccordionItem v-for="category in categories" :key="category.id" :value="category.id" class="border-none">
        <div class="flex items-center">
          <template v-if="category.subcategories && category.subcategories.length > 0">
            <AccordionTrigger
              class="flex-1 px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors [&[data-state=open]>svg]:rotate-180 hover:no-underline">
              <span class="flex items-center gap-2">
                {{ category.name }}
                <span class="text-xs text-muted-foreground">
                  ({{ category.count }})
                </span>
              </span>
            </AccordionTrigger>
          </template>

          <template v-else>
            <NuxtLink :to="`/category/${category.slug}`"
              class="flex-1 px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
              @click="props.onClose">
              {{ category.name }}
              <span class="text-xs text-muted-foreground ml-2">
                ({{ category.count }})
              </span>
            </NuxtLink>
          </template>
        </div>

        <!-- Subcategories -->
        <AccordionContent v-if="category.subcategories && category.subcategories.length > 0" class="pb-0">
          <div class="pl-4 space-y-1 pb-2">
            <NuxtLink :to="APP_ROUTES.category.path(category.slug)"
              class="block px-4 py-2 text-sm text-primary hover:bg-primary/10 rounded-lg transition-colors"
              @click="props.onClose">
              All {{ category.name }}
            </NuxtLink>
            <NuxtLink v-for="sub in category.subcategories" :key="sub.id"
              :to="APP_ROUTES.subcategory.path(category.slug, sub.slug)"
              class="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
              @click="props.onClose">
              {{ sub.name }}
            </NuxtLink>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>

    <!-- Bottom Links -->
    <div class="mt-4 pt-4 border-t border-border space-y-1">
      <NuxtLink :to="APP_ROUTES.contact.path"
        class="flex items-center gap-3 px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
        @click="props.onClose">
        <Megaphone class="w-5 h-5" />
        Advertise with Us
      </NuxtLink>

      <!-- <NuxtLink to="/admin"
        class="block px-4 py-3 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors"
        @click="props.onClose">
        Dashboard
      </NuxtLink> -->
    </div>
  </nav>
</template>
