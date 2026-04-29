<script setup lang="ts">
import { ref, watchEffect } from "vue"
import { useRouter } from "vue-router"
const { submit, isSubmitting } = useRegisterForm();

import { Eye, EyeOff, Mail, Lock, User } from "lucide-vue-next"
import { APP_ROUTES } from "~/constants";


definePageMeta({
  layout: "auth",
});

const router = useRouter()

const showPassword = ref(false)

const { user } = useAuth()

watchEffect(() => {
  if (user.value) {
    router.push("/")
  }
})

</script>

<template>
  <LayoutAuthCard>
    <template #title>
      Create Account
    </template>

    <template #description>
      Join the OneClick Africa community today
    </template>

    <form @submit.prevent="submit" class="space-y-4">
      <FormField v-slot="{ componentField }" name="name">
        <FormItem>
          <FormLabel>Full Name</FormLabel>
          <FormControl>
            <div class="relative">
              <User class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input id="name" v-bind="componentField" type="text" placeholder="John Doe" class="pl-10" required />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

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
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="password">
        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <div class="relative">
              <Lock class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input v-bind="componentField" :type="showPassword ? 'text' : 'password'" placeholder="Password"
                class="pl-10 pr-10" required minlength="8" />
              <button type="button" @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                <EyeOff v-if="showPassword" class="w-4 h-4" />
                <Eye v-else class="w-4 h-4" />
              </button>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <Button type="submit" class="w-full bg-primary hover:opacity-90" :disabled="isSubmitting">
        {{ isSubmitting ? 'Please wait...' : 'Register' }}
      </Button>
    </form>

    <p class="text-center text-sm text-muted-foreground">
      Already have an account?

      <NuxtLink :to="APP_ROUTES.login.path" class="text-primary hover:underline font-medium ml-1"
        :aria-label="APP_ROUTES.login.name">
        Log in
      </NuxtLink>
    </p>
  </LayoutAuthCard>
</template>