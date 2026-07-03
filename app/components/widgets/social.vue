<script setup lang="ts">
const { onSubmit, isSubmitting, meta } = useNewsletterForm()
import { socials } from '~/constants/socials';
</script>
<template>
  <div class="bg-black rounded-2xl p-6 text-primary-foreground space-y-3">
    <form @submit="onSubmit">
      <h3 class="font-display text-lg font-bold">Newsletter</h3>
      <p class="text-sm opacity-90 mb-4">Get daily news updates delivered to your inbox.</p>
      <div class="flex items-center gap-2">
        <FormField v-slot="{ componentField }" name="email">
          <FormItem>
            <FormControl>
              <div class="relative flex-1 w-full">
                <Icon name="lucide:mail" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white" />
                <Input placeholder="Enter your email" v-bind="componentField"
                  class="pl-10 bg-primary-foreground/10 border-0 text-white placeholder:text-primary-foreground/50" />
              </div>
            </FormControl>
          </FormItem>
        </FormField>
        <Button :disable="isSubmitting || !meta.valid" size="icon"
          class="rounded-lg bg-background text-black font-medium text-sm hover:bg-background/80 transition-opacity shrink-0"
          aria-label="submit-newsletter">
          <Icon name="lucide:arrow-right" class="w-4 h-4" />
        </Button>
      </div>
    </form>
    <div>
      <h3 class="font-display text-lg font-bold">Follow us</h3>
      <p class="text-sm opacity-90 mb-4">Stay up to date on our social media platforms.</p>
      <ul class="flex gap-3 items-center">
        <li v-for="item in socials" :key="item.name">
          <NuxtLink :href="item.url" :aria-label="item.name" target="__blank" rel="noopener noreferral nofollow"
            class="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-primary hover:text-white flex items-center justify-center transition-colors">
            <Icon :name="item.icon" class="w-4 h-4" />
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>