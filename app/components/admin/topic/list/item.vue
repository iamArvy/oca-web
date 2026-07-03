<script setup lang="ts">
import { File, Folder, FolderOpen } from "@lucide/vue";
import type { Topic } from "~/types";

interface Props {
  item: Topic;
}

interface Emits {
  (
    e: "edit" | "delete" | "create-subtopic" | "toggle-featured",
    item: Topic,
  ): void;
}
defineEmits<Emits>();
const props = defineProps<Props>();
const hasChildren = computed(() =>
  props.item.children ? props.item.children.length > 0 : false,
);
const childrenOpen = ref(false);
</script>
<template>
  <div :value="item.id">
    <div class="flex items-center border-top border-bottom">
      <template v-if="hasChildren">
        <div class="flex-1 px-4 py-3 text-sm hover:bg-muted rounded-lg transition-colors cursor-pointer">
          <div class="flex flex-1 justify-between items-center">
            <h2 class="flex items-center gap-3 text-foreground hover:text-primary font-medium cursor-pointer"
              @click="childrenOpen = !childrenOpen">
              <FolderOpen v-if="childrenOpen" class="w-5 h-5 text-primary" />
              <Folder v-else class="w-5 h-5 text-primary" />
              {{ item.name }}
            </h2>
            <AdminTopicListMenu :topic="item" @edit="$emit('edit', $event)" @delete="$emit('delete', $event)"
              @create-subtopic="$emit('create-subtopic', $event)" @toggle-featured="$emit('toggle-featured', $event)" />
          </div>
        </div>
      </template>

      <template v-else>
        <div
          class="flex justify-between items-center flex-1 px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors">
          <h2 class="flex-1 flex items-center gap-2 text-sm font-medium text-foreground">
            <File class="w-5 h-5 text-primary" />
            {{ item.name }}
          </h2>
          <AdminTopicListMenu :topic="item" @edit="$emit('edit', $event)" @delete="$emit('delete', $event)"
            @create-subtopic="$emit('create-subtopic', $event)" @toggle-featured="$emit('toggle-featured', $event)" />
        </div>
      </template>
    </div>

    <div v-if="hasChildren && childrenOpen" class="pb-0 pl-2">
      <div class="pl-4 space-y-2 pb-2">
        <AdminTopicListItem v-for="child in item.children" :key="child.id" :item="child" @edit="$emit('edit', $event)"
          @delete="$emit('delete', $event)" @create-subtopic="$emit('create-subtopic', $event)"
          @toggle-featured="$emit('toggle-featured', $event)" />
      </div>
    </div>
  </div>
</template>
