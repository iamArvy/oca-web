<script setup lang="ts">
import type { Collection, Topic } from "~/types";

type Mode = "edit" | "create" | "manage-posts";
const props = defineProps<{
  collection: Collection | null;
  mode: Mode;
}>();
defineEmits<{
  (e: "save", data: Partial<Topic>): void;
  (e: "cancel"): void;
}>();

const { onSubmit } = useCollectionEditor(props.collection, props.mode);
</script>

<template>
  <form class="space-y-6" @submit.prevent="onSubmit">
    <FormField v-slot="{ componentField }" name="name">
      <FormItem>
        <FormLabel>Name</FormLabel>
        <FormControl>
          <Input v-bind="componentField" placeholder="Enter name of collection" required />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="description">
      <FormItem>
        <FormLabel>Description</FormLabel>
        <FormControl>
          <TextArea v-bind="componentField" placeholder="Enter description of the collection" />
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
