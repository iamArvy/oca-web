<script setup lang="ts">
import { FolderOpen } from 'lucide-vue-next';
import { APP_ROUTES } from '~/constants';
import type { Topic } from '~/interfaces';

interface Props {
  item: Topic
};

const props = defineProps<Props>()
const hasChildren = computed(() => props.item.children ? props.item.children.length > 0 : false)

</script>
<template>
  <AccordionItem :value="item.id + item.slug" class="border-none">
    <div class="flex items-center">
      <template v-if="hasChildren">
        <AccordionTrigger
          class="flex-1 px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg hover:no-underline w-full">
          <span class="flex items-center gap-2">
            <FolderOpen />
            {{ item.name }}
            <!-- <span class="text-xs text-muted-foreground">
                    ({{ item.count }})
                  </span> -->
          </span>
        </AccordionTrigger>
      </template>

      <template v-else>
        <NuxtLink :to="APP_ROUTES.topic.path(item.slug)"
          class="flex-1 px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors">
          {{ item.name }}
          <!-- <span class="text-xs text-muted-foreground ml-2">
                  ({{ category.count }})
                </span> -->
        </NuxtLink>
      </template>
    </div>

    <AccordionContent v-if="hasChildren" class="pb-0">
      <div class="pl-4 space-y-1 pb-2">
        <NuxtLink :to="APP_ROUTES.topic.path(item.slug)"
          class="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg hover:no-underline transition-colors">
          All {{ item.name }}
        </NuxtLink>
        <LayoutMenuItem v-for="child in item.children" :key="child.id" :item="child" />
        <!-- <NuxtLink v-for="child in item.children" :key="child.id" :to="APP_ROUTES.topic.path(child.slug)"
        class="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors">
        {{ child.name }}
      </NuxtLink> -->
      </div>
    </AccordionContent>
  </AccordionItem>
</template>