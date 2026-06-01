<template>
  <div :class="[
    'mt-1.5 border-2 border-dashed rounded-xl p-4 transition-colors cursor-pointer',
    isDragging ? 'border-primary bg-primary/5' : 'border-border',
  ]" @dragover.prevent="handleDragOver" @dragleave.prevent="handleDragLeave" @drop.prevent="handleDrop"
    @click="openFilePicker">
    <!-- Preview -->
    <div v-if="preview" class="relative">
      <!-- Image Preview -->
      <NuxtImg v-if="isImage" :src="preview" alt="Uploaded" class="w-full h-48 object-cover rounded-lg" />

      <!-- Video Preview -->
      <video v-else-if="isVideo" :src="preview" controls class="w-full h-48 object-cover rounded-lg" />

      <!-- File Preview -->
      <div v-else class="w-full h-48 flex items-center justify-center bg-muted rounded-lg">
        <FileIcon class="w-10 h-10" />
        <span class="ml-2 text-sm">{{ fileName }}</span>
      </div>

      <Button variant="destructive" size="icon" class="absolute top-2 right-2 h-8 w-8" type="button"
        @click.stop="clearFile">
        <X class="w-4 h-4" />
      </Button>
    </div>

    <!-- Placeholder -->
    <div v-else class="flex flex-col items-center justify-center py-8 text-muted-foreground">
      <component :is="icon" class="w-10 h-10 mb-2" />
      <p class="text-sm font-medium">Drag & drop, paste, or click to upload</p>
      <p class="text-xs mt-1">
        {{ label }}
      </p>
    </div>

    <!-- Hidden Input -->
    <input ref="fileInput" type="file" :accept="accept" class="hidden" @change="handleFileSelect" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { X, ImageIcon, VideoIcon, FileIcon } from "lucide-vue-next";
import { Button } from "@/components/ui/button";

const props = defineProps<{
  modelValue?: File | null;
  initialValue?: string | null;
  type?: "image" | "video" | "file";
  accept?: string;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: File | null];
}>();

const fileInput = ref<HTMLInputElement | null>(null);
const isDragging = ref(false);

const preview = ref<string | null>(props.initialValue || null);
const fileName = ref<string | null>(null);

/**
 * Accept Types
 */
const accept = computed(() => {
  if (props.accept) return props.accept;

  switch (props.type) {
    case "image":
      return "image/*";
    case "video":
      return "video/*";
    default:
      return "*";
  }
});

/**
 * Placeholder label
 */
const label = computed(() => {
  switch (props.type) {
    case "image":
      return "PNG, JPG, GIF up to 10MB";
    case "video":
      return "MP4, WebM up to 50MB";
    default:
      return "Upload any file";
  }
});

/**
 * Icons
 */
const icon = computed(() => {
  switch (props.type) {
    case "image":
      return ImageIcon;
    case "video":
      return VideoIcon;
    default:
      return FileIcon;
  }
});

/**
 * File type detection
 */
const isImage = computed(() => {
  return preview.value && props.modelValue?.type.startsWith("image");
});

const isVideo = computed(() => {
  return preview.value && props.modelValue?.type.startsWith("video");
});

/**
 * File Handling
 */
function openFilePicker() {
  fileInput.value?.click();
}

function handleFileSelect(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (file) readFile(file);
}

function handleDrop(e: DragEvent) {
  const file = e.dataTransfer?.files?.[0];
  if (file) readFile(file);
  isDragging.value = false;
}

function handleDragOver() {
  isDragging.value = true;
}

function handleDragLeave() {
  isDragging.value = false;
}

function readFile(file: File) {
  preview.value = URL.createObjectURL(file);
  fileName.value = file.name;
  emit("update:modelValue", file);
}

function clearFile() {
  preview.value = null;
  fileName.value = null;
  emit("update:modelValue", null);
}
</script>
