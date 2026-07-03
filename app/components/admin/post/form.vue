<script setup lang="ts">
import { PostTypeOptions, type PostAdminData } from "~/types";

type Mode = "edit" | "create" | "view";
const props = defineProps<{ post: PostAdminData | null; mode: Mode }>();
defineEmits<{
  (e: "save", data: Partial<PostAdminData>): void;
  (e: "cancel"): void;
}>();

const { onSubmit, fileRef } = usePostEditor(props.post, props.mode);
const { topicOptions } = await useTopics();
</script>

<template>
  <form class="space-y-6" @submit.prevent="onSubmit">
    <!-- Image -->
    <FormField v-slot="{ componentField }" name="image">
      <FormItem>
        <FormLabel>Featured Image</FormLabel>
        <FormControl>
          <AdminImageUpload v-model="fileRef" :initial-value="post?.image ?? null" />
          <Input v-bind="componentField" class="mt-2" placeholder="Or paste image URL..." />
        </FormControl>
        <!-- <FormDescription> This is your public display name. </FormDescription> -->
        <FormMessage />
      </FormItem>
    </FormField>

    <!-- Title -->
    <FormField v-slot="{ componentField }" name="title">
      <FormItem>
        <FormLabel>Title</FormLabel>
        <FormControl>
          <Input v-bind="componentField" placeholder="Enter post title" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <!-- Topic -->
    <div class="md:grid grid-cols-2 space-x-2">
      <FormField v-slot="{ componentField }" name="topicId">
        <FormItem>
          <FormLabel>Topics</FormLabel>
          <FormControl>
            <AdminComboBox v-if="topicOptions" v-bind="componentField" :options="topicOptions"
              placeholder="Select topic" search-placeholder="Search topic..." empty-text="No topic found."
              class="w-full" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="type">
        <FormItem>
          <FormLabel>Type</FormLabel>
          <FormControl>
            <Select v-bind="componentField">
              <SelectTrigger class="w-full capitalize">
                <SelectValue placeholder="Select Post Type" />
              </SelectTrigger>
              <SelectContent class="bg-card capitalize">
                <SelectItem v-for="type in PostTypeOptions" :key="type" class="capitalise" :value="type">
                  {{ type }}
                </SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>

    <!-- Tags -->
    <FormField v-slot="{ handleChange, value }" name="tags">
      <FormItem>
        <FormLabel>Tags</FormLabel>
        <FormControl>
          <TagsInput :model-value="value" @update:model-value="handleChange">
            <TagsInputItem v-for="item in value" :key="item" :value="item">
              <TagsInputItemText />
              <TagsInputItemDelete />
            </TagsInputItem>

            <TagsInputInput placeholder="Fruits..." />
          </TagsInput>
        </FormControl>
        <!-- <FormDescription> This is your public display name. </FormDescription> -->
        <FormMessage />
      </FormItem>
    </FormField>

    <!-- Content -->
    <FormField v-slot="{ componentField }" name="excerpt">
      <FormItem>
        <FormLabel>Excerpt</FormLabel>
        <FormControl>
          <Textarea v-bind="componentField" placeholder="Brief summary" rows="3" />
        </FormControl>
        <!-- <FormDescription> This is your public display name. </FormDescription> -->
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="content">
      <FormItem>
        <FormLabel>Content</FormLabel>
        <FormControl>
          <AdminTextEditor v-bind="componentField" />
        </FormControl>
        <!-- <FormDescription> This is your public display name. </FormDescription> -->
        <FormMessage />
      </FormItem>
    </FormField>

    <DialogFooter>
      <Button variant="outline" type="button" @click="$emit('cancel')">Cancel</Button>
      <Button type="submit" class="bg-primary hover:opacity-90">Save</Button>
    </DialogFooter>
  </form>
</template>
