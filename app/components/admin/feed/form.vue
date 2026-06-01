<script setup lang="ts">
import type { FeedAdminData } from "~/types";

type Mode = "edit" | "create";
const props = defineProps<{
  feed: FeedAdminData | null;
  mode: Mode;
}>();
defineEmits<{
  (e: "save", data: Partial<FeedAdminData>): void;
  (e: "cancel"): void;
}>();

const { onSubmit, FeedTransformerOptions, fileRef, isSubmitting } =
  useFeedEditor(props.feed, props.mode);
const { topicOptions } = await useTopics();
</script>

<template>
  <form class="space-y-6" @submit.prevent="onSubmit">
    <FormField v-slot="{ componentField }" name="image">
      <FormItem>
        <FormLabel>Feed Icon</FormLabel>
        <FormControl>
          <ImageUpload v-model="fileRef" :initial-value="feed?.image ?? null" />
          <Input v-bind="componentField" class="mt-2" placeholder="Or paste image URL..." />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="name">
      <FormItem>
        <FormLabel>Name</FormLabel>
        <FormControl>
          <Input v-bind="componentField" placeholder="Enter name of Feed" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="source">
      <FormItem>
        <FormLabel>Source</FormLabel>
        <FormControl>
          <Input v-bind="componentField" placeholder="Enter source of Feed" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <div class="md:grid grid-cols-2 gap-3">
      <FormField v-slot="{ componentField }" name="topicId">
        <FormItem>
          <FormLabel>Topic</FormLabel>
          <FormControl>
            <AppCombobox v-if="topicOptions" v-bind="componentField" :options="topicOptions" placeholder="Select topic"
              search-placeholder="Search topic..." empty-text="No topic found." class="w-full" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="transformer">
        <FormItem>
          <FormLabel>Transformer</FormLabel>
          <FormControl>
            <Select v-bind="componentField">
              <SelectTrigger class="w-full capitalize">
                <SelectValue placeholder="Select Transformer" />
              </SelectTrigger>
              <SelectContent class="bg-card capitalize">
                <SelectItem v-for="transformer in FeedTransformerOptions" :key="transformer" class="capitalise"
                  :value="transformer">
                  {{ transformer }}
                </SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>

    <DialogFooter>
      <Button variant="outline" type="button" @click="$emit('cancel')">Cancel</Button>
      <Button :disable="isSubmitting" type="submit" class="bg-primary hover:opacity-90">Save</Button>
    </DialogFooter>
  </form>
</template>
