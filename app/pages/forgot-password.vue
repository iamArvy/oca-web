<template>
  <LayoutAuthCard>
    <template #title>
      Forgot Password?
    </template>

    <template #description>
      Enter your email address and we'll send you a link to reset your password.
    </template>

    <form @submit.prevent="submit" class="space-y-4">
      <FormField v-slot="{ componentField }" name="email">
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <div class="relative">
              <Mail class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

              <Input id="email" v-bind="componentField" type="email" placeholder="you@example.com" class="pl-10"
                required />
            </div>
          </FormControl>
          <FormDescription />
          <FormMessage />
        </FormItem>
      </FormField>


      <Button type="submit" class="w-full bg-primary hover:opacity-90" :disabled="isSubmitting">
        {{ isSubmitting ? 'Please wait...' : 'Send Reset Link' }}
      </Button>
    </form>

    <p class="text-center text-sm text-muted-foreground">
      Remember your password?
      <NuxtLink to="/login" class="text-primary hover:underline font-medium ml-1">
        Sign in
      </NuxtLink>
    </p>
  </LayoutAuthCard>
</template>

<script>
export default {
  data() {
    return {
      email: ''
    }
  },
  methods: {
    handleSubmit() {
      // Handle forgot password logic here
    }
  }
}
</script>