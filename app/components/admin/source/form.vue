<script setup lang="ts">
import type { LiveSourceAdminData } from "~/types";

type Mode = "edit" | "create";
const props = defineProps<{
  source: LiveSourceAdminData | null;
  mode: Mode;
}>();
defineEmits<{
  (e: "save", data: Partial<LiveSourceAdminData>): void;
  (e: "cancel"): void;
}>();

const { onSubmit, isSubmitting } = useLiveEditor(props.source, props.mode);
</script>

<template>
  <form class="space-y-6" @submit.prevent="onSubmit">
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
          <Input v-bind="componentField" placeholder="Enter source of Feed" type="url" />
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
