<script setup lang="ts">
import type { Topic } from "~/types";

type Mode = "edit" | "create";
type Type = "topic" | "subtopic";
const props = defineProps<{
  topic: Topic | null;
  mode: Mode;
  type: Type;
}>();
defineEmits<{
  (e: "save", data: Partial<Topic>): void;
  (e: "cancel"): void;
}>();

const { onSubmit } = useTopicEditor(props.topic, props.mode);
const { topicOptions } = await useTopics();

</script>

<template>
  <form class="space-y-6" @submit.prevent="onSubmit">
    <!-- Name -->
    <FormField v-slot="{ componentField }" name="name">
      <FormItem>
        <FormLabel>Name</FormLabel>
        <FormControl>
          <Input v-bind="componentField" placeholder="Enter name of Topic" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="parentId">
      <FormItem>
        <FormLabel>Parent</FormLabel>
        <FormControl>
          <AppCombobox v-if="topicOptions" v-bind="componentField" :options="topicOptions" placeholder="Select topic"
            search-placeholder="Search topic..." empty-text="No topic found." class="w-full" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ handleChange, value }" name="keywords">
      <FormItem>
        <FormLabel>Keywords</FormLabel>
        <FormControl>
          <TagsInput :model-value="value" @update:model-value="handleChange">
            <TagsInputItem v-for="item in value" :key="item" :value="item">
              <TagsInputItemText />
              <TagsInputItemDelete />
            </TagsInputItem>

            <TagsInputInput placeholder="Keyword..." />
          </TagsInput>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <DialogFooter>
      <Button variant="outline" type="button" @click="$emit('cancel')">Cancel
      </Button>
      <Button type="submit" class="bg-primary hover:opacity-90">Save</Button>
    </DialogFooter>
  </form>
</template>
