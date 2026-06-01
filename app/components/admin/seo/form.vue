<script setup lang="ts">
import type { Seo } from "~/types";

type Mode = "edit" | "create";
const props = defineProps<{
  seo?: Seo | null;
  mode: Mode;
}>();
defineEmits<{
  (e: "cancel"): void;
}>();

const { onSubmit, isSubmitting } = useSeoEditor(props.seo, props.mode);
</script>

<template>
  <form class="space-y-6" @submit.prevent="onSubmit">
    <FormField v-slot="{ componentField }" name="title">
      <FormItem>
        <FormLabel>Title</FormLabel>
        <FormControl>
          <Input v-bind="componentField" placeholder="Enter title of SEO" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="slug">
      <FormItem>
        <FormLabel>Slug</FormLabel>
        <FormControl>
          <Input v-bind="componentField" placeholder="Enter slug of SEO" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="description">
      <FormItem>
        <FormLabel>Description</FormLabel>
        <FormControl>
          <Textarea v-bind="componentField" placeholder="Enter description of SEO" rows="4" />
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

            <TagsInputInput placeholder="Politics..." />
          </TagsInput>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="author">
      <FormItem>
        <FormLabel>Author</FormLabel>
        <FormControl>
          <Input v-bind="componentField" placeholder="Enter author of SEO" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="ogTitle">
      <FormItem>
        <FormLabel>OG Title</FormLabel>
        <FormControl>
          <Input v-bind="componentField" placeholder="Enter OG title of SEO" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="ogDescription">
      <FormItem>
        <FormLabel>OG Description</FormLabel>
        <FormControl>
          <Textarea v-bind="componentField" placeholder="Enter OG description of SEO" rows="4" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <DialogFooter>
      <Button variant="outline" type="button" @click="$emit('cancel')">Cancel</Button>
      <Button :disable="isSubmitting" type="submit" class="bg-primary hover:opacity-90">Save</Button>
    </DialogFooter>
  </form>
</template>
