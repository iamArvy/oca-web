<script setup lang="ts">
const { onSubmit, isSubmitting } = useNewsletterForm()
</script>
<template>
  <form class="bg-primary rounded-2xl p-6 text-primary-foreground" @submit="onSubmit">
    <h3 class="font-display text-lg font-bold mb-2">Newsletter</h3>
    <p class="text-sm opacity-90 mb-4">Get daily news updates delivered to your inbox.</p>
    <FormField v-slot="{ componentField }" name="email">
      <FormItem>
        <FormControl>
          <Input type="email" placeholder="Enter your email" v-bind="componentField"
            class="w-full px-4 py-2 rounded-lg bg-background/20 backdrop-blur-sm text-primary-foreground placeholder:text-primary-foreground/60 border border-primary-foreground/20 text-sm mb-3" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button type="submit" :disabled="isSubmitting"
      class="w-full px-4 py-2 rounded-lg bg-background text-foreground font-medium text-sm hover:opacity-90 transition-opacity">
      Submit
    </Button>
    <!-- <h3 class="font-display text-lg font-bold mb-2">Newsletter</h3>
    <p class="text-sm opacity-90 mb-4">Get daily news updates delivered to your inbox.</p>
    <input type="email" placeholder="Enter your email"
      class="w-full px-4 py-2 rounded-lg bg-background/20 backdrop-blur-sm text-primary-foreground placeholder:text-primary-foreground/60 border border-primary-foreground/20 text-sm mb-3" />
    <button
      class="w-full px-4 py-2 rounded-lg bg-background text-foreground font-medium text-sm hover:opacity-90 transition-opacity">
      Subscribe
    </button> -->
  </form>
</template>