<script setup lang="ts">
import { computed, ref } from 'vue'
import { CheckIcon, ChevronsUpDownIcon } from '@lucide/vue'

import { cn } from '@/lib/utils'

export interface ComboboxOption {
  label: string
  value: string
}

interface Props {
  modelValue?: string
  options: ComboboxOption[]
  placeholder?: string
  searchPlaceholder?: string
  emptyText?: string
  class?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Select option...',
  searchPlaceholder: 'Search...',
  emptyText: 'No results found.',
})

const emit = defineEmits<{
  'update:modelValue': [value?: string]
}>()

const open = ref(false)

const selectedOption = computed(() =>
  props.options.find(option => option.value === props.modelValue),
)

function selectOption(selectedValue: string) {
  emit(
    'update:modelValue',
    selectedValue === props.modelValue
      ? undefined
      : selectedValue,
  )

  open.value = false
}
</script>

<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <Button variant="outline" role="combobox" :aria-expanded="open" :disabled="disabled"
        :class="cn('w-full justify-between', props.class)">
        {{ selectedOption?.label || placeholder }}

        <ChevronsUpDownIcon class="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>

    <PopoverContent class="w-(--radix-popover-trigger-width) p-0">
      <Command>
        <CommandInput class="h-9" :placeholder="searchPlaceholder" />

        <CommandList>
          <CommandEmpty>
            {{ emptyText }}
          </CommandEmpty>

          <CommandGroup>
            <CommandItem v-for="option in options" :key="String(option.value)" :value="String(option.value)"
              @select="() => selectOption(option.value)">
              {{ option.label }}

              <CheckIcon :class="cn(
                'ml-auto h-4 w-4',
                modelValue === option.value
                  ? 'opacity-100'
                  : 'opacity-0',
              )
                " />
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>