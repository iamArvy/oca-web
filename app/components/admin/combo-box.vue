<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import { cn } from '@/lib/utils'

export interface TopicOption {
  label: string
  value: string
}

interface Props {
  modelValue?: string
  options: TopicOption[]
  placeholder?: string
  emptyText?: string
  class?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Search topics...',
  emptyText: 'No topics found.',
})

const emit = defineEmits<{
  'update:modelValue': [value?: string]
}>()

const query = ref('')
const isOpen = ref(false)
const inputRef = ref<HTMLInputElement | null>(null)
const activeIndex = ref(-1)

const selectedOption = computed(() =>
  props.options.find(option => option.value === props.modelValue),
)

const filteredOptions = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return props.options.slice(0, 50)
  return props.options.filter(option =>
    option.label.toLowerCase().includes(q),
  )
})

function onOpen() {
  if (props.disabled) return
  isOpen.value = true
  activeIndex.value = -1
}

function onClose() {
  isOpen.value = false
  activeIndex.value = -1
  query.value = ''
}

function selectOption(value: string) {
  emit('update:modelValue', value === props.modelValue ? undefined : value)
  onClose()
}

function clearSelection() {
  emit('update:modelValue', undefined)
  query.value = ''
  nextTick(() => inputRef.value?.focus())
}

// function onKeydown(e: KeyboardEvent) {
//   if (!isOpen.value) {
//     if (e.key === 'ArrowDown' || e.key === 'Enter') onOpen()
//     return
//   }
//   if (e.key === 'ArrowDown') {
//     e.preventDefault()
//     activeIndex.value = Math.min(activeIndex.value + 1, filteredOptions.value.length - 1)
//   }
//   else if (e.key === 'ArrowUp') {
//     e.preventDefault()
//     activeIndex.value = Math.max(activeIndex.value - 1, 0)
//   }
//   else if (e.key === 'Enter' && activeIndex.value >= 0) {
//     e.preventDefault()
//     selectOption(filteredOptions.value[activeIndex.value].value)
//   }
//   else if (e.key === 'Escape') {
//     onClose()
//     inputRef.value?.blur()
//   }
// }
</script>

<template>
  <Popover v-model:open="isOpen" :modal="false">
    <PopoverTrigger as-child>
      <div :class="cn('w-full', props.class)">
        <InputGroup>
          <InputGroupInput ref="inputRef" v-model="query"
            :placeholder="selectedOption && !query ? selectedOption.label : placeholder" :disabled="disabled"
            :class="cn(selectedOption && !query ? 'font-medium' : '')" autocomplete="off" role="combobox"
            :aria-expanded="isOpen" aria-haspopup="listbox" @focus="onOpen" />

          <!-- Clear button when a value is selected -->
          <InputGroupAddon v-if="modelValue">
            <button type="button"
              class="flex items-center justify-center opacity-50 hover:opacity-100 focus:outline-none"
              :disabled="disabled" @click.stop="clearSelection">
              <Icon name="lucide:x" class="h-3.5 w-3.5" />
              <span class="sr-only">Clear</span>
            </button>
          </InputGroupAddon>

          <!-- Search icon when nothing selected -->
          <InputGroupAddon v-else>
            <Icon name="lucide:search" class="h-4 w-4 text-muted-foreground" />
          </InputGroupAddon>
        </InputGroup>
      </div>
    </PopoverTrigger>

    <PopoverContent class="w-(--radix-popover-trigger-width) p-0" :trap-focus="false" @open-auto-focus.prevent>
      <ScrollArea class="h-72">
        <ul role="listbox" class="py-1">
          <!-- Hint shown before user types -->
          <li v-if="!query.trim() && options.length > 50" class="px-3 py-1.5 text-xs text-muted-foreground">
            Type to search all {{ options.length }} topics
          </li>

          <!-- Options -->
          <li v-for="(option, index) in filteredOptions" :key="option.value" role="option"
            :aria-selected="option.value === modelValue" :class="cn(
              'relative flex cursor-pointer select-none items-center rounded-sm px-3 py-2 text-sm outline-none',
              'hover:bg-accent hover:text-accent-foreground',
              index === activeIndex && 'bg-accent text-accent-foreground',
              option.value === modelValue && 'font-medium',
            )" @mousedown.prevent="selectOption(option.value)" @mousemove="activeIndex = index">
            {{ option.label }}
            <Icon name="lucide:check"
              :class="cn('ml-auto h-4 w-4 shrink-0', option.value === modelValue ? 'opacity-100' : 'opacity-0')" />
          </li>

          <!-- Empty state -->
          <li v-if="filteredOptions.length === 0" class="py-6 text-center text-sm text-muted-foreground">
            {{ emptyText }}
          </li>
        </ul>
      </ScrollArea>
    </PopoverContent>
  </Popover>
</template>