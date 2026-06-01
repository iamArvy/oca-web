<script setup lang="ts">
import type { AdAdminData } from "~/types";

type Mode = "edit" | "create";
interface Props {
  ad?: AdAdminData | null;
  mode: Mode;
}
const props = defineProps<Props>();

defineEmits<{
  (e: "save", data: Partial<AdAdminData>): void;
  (e: "cancel"): void;
}>();

const {
  onSubmit,
  previewEndDate,
  adPlacementOptions,
  adContentTypeOptions,
  adDurationUnitOptions,
  fileRef,
} = useAdEditor(props.ad, props.mode);
</script>

<template>
  <form class="space-y-6" @submit.prevent="onSubmit">
    <!-- Image -->
    <FormField v-slot="{ componentField }" name="image">
      <FormItem>
        <FormLabel>Ad Image</FormLabel>
        <FormControl>
          <AdminFileUpload v-model="fileRef" :initial-value="ad?.content ?? null" />
          <Input v-bind="componentField" class="mt-2" placeholder="Or paste image URL..." />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <!-- Title -->
    <FormField v-slot="{ componentField }" name="title">
      <FormItem>
        <FormLabel>Title</FormLabel>
        <FormControl>
          <Input v-bind="componentField" placeholder="Ad title" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <!-- Target URL -->
    <FormField v-slot="{ componentField }" name="target">
      <FormItem>
        <FormLabel>Target URL</FormLabel>
        <FormControl>
          <Input v-bind="componentField" placeholder="https://example.com" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <div class="grid grid-cols-2 gap-4">
      <FormField v-slot="{ componentField }" name="placement">
        <FormItem>
          <FormLabel>Ad Placement</FormLabel>
          <FormControl>
            <Select v-bind="componentField">
              <SelectTrigger class="w-full capitalize">
                <SelectValue placeholder="Select ad placement" />
              </SelectTrigger>

              <SelectContent class="bg-card capitalize">
                <SelectItem v-for="type in adPlacementOptions" :key="type" :value="type">
                  {{ type }}
                </SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="contentType">
        <FormItem>
          <FormLabel>Ad Content Type</FormLabel>
          <FormControl>
            <Select v-bind="componentField">
              <SelectTrigger class="w-full capitalize">
                <SelectValue placeholder="Select ad content type" />
              </SelectTrigger>

              <SelectContent class="bg-card capitalize">
                <SelectItem v-for="type in adContentTypeOptions" :key="type" :value="type">
                  {{ type }}
                </SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <!-- Start Date -->
      <FormField v-slot="{ componentField }" name="startDate">
        <FormItem>
          <FormLabel>Start Date</FormLabel>
          <FormControl>
            <Input type="date" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>

    <!-- Duration -->
    <div class="grid grid-cols-2 gap-4">
      <FormField v-slot="{ componentField }" name="duration">
        <FormItem>
          <FormLabel>Duration</FormLabel>
          <FormControl>
            <Input type="number" min="1" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="durationUnit">
        <FormItem>
          <FormLabel>Duration Unit</FormLabel>
          <FormControl>
            <Select v-bind="componentField" class="capitalize">
              <SelectTrigger class="w-full capitalize">
                <SelectValue placeholder="Unit" />
              </SelectTrigger>

              <SelectContent class="bg-card capitalize">
                <SelectItem v-for="unit in adDurationUnitOptions" :key="unit" :value="unit">{{ unit }}</SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>

    <!-- Preview -->
    <div v-if="previewEndDate" class="text-sm text-muted-foreground">
      Campaign will end on:
      <span class="font-medium text-foreground">
        {{ previewEndDate }}
      </span>
    </div>

    <!-- Buttons -->
    <DialogFooter>
      <Button variant="outline" type="button" @click="$emit('cancel')">
        Cancel
      </Button>

      <Button type="submit" class="bg-primary hover:opacity-90">
        Save Ad
      </Button>
    </DialogFooter>
  </form>
</template>
