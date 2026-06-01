<script setup lang="ts">
import { ref, watchEffect } from "vue"
import { useRouter } from "vue-router"
const { email, password, errors, isSubmitting, submit } = useLoginForm()
const { passwordButton, toggleHidePassword } = usePasswordButton()

import { Eye, EyeOff, Mail, Lock } from "lucide-vue-next"
import { APP_ROUTES } from "~/constants";


definePageMeta({
  layout: "auth",
});

const router = useRouter()
const route = useRoute()
const redirect = route.query.redirect as string
// const showPassword = ref(false)

// const { user } = useAuth()

// watchEffect(() => {
//   if (user.value) {
//     router.push(redirect ?? APP_ROUTES.home.path)
//   }
// })

</script>

<template>
  <LayoutAuthCard>
    <template #title>
      Welcome Back
    </template>

    <template #description>
      Sign in to your OneClick Africa account
    </template>

    <form @submit.prevent="submit" class="space-y-4">
      <FieldGroup>
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel for="login-email-field">
                Email Address
              </FieldLabel>
              <Input id="login-email-field" type="email" placeholder="youremail@domain.com" v-model="email" required />
              <FieldError v-if="errors.email">{{ errors.email }}</FieldError>
            </Field>
            <Field>
              <FieldLabel for="login-password-field" class="justify-between">
                Password
                <NuxtLink :to="APP_ROUTES.admin.forgotPassword" class="underline text-destructive">
                  Forgot Password?
                </NuxtLink>
              </FieldLabel>
              <InputGroup>
                <InputGroupInput id="login-password-field" placeholder="Enter Password" :type="passwordButton.type"
                  v-model="password" required />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton :aria-label="passwordButton.label" :title="passwordButton.label" type="button"
                    size="icon-xs" @click="toggleHidePassword">
                    <Icon :name="passwordButton.icon" />
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
              <FieldError v-if="errors.password">{{ errors.password }}</FieldError>
            </Field>
            <Button :disabled="isSubmitting" size="lg">
              <Spinner v-if="isSubmitting" />
              Continue
            </Button>
            <!-- <p class="text-center">
              Don't have an account?
              <NuxtLink :to="APP_ROUTES.register" class="text-primary">
                Sign up
              </NuxtLink>
            </p> -->
          </FieldGroup>
        </FieldSet>
      </FieldGroup>
      <!-- <FormField v-slot="{ componentField }" name="email">
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

      <FormField v-slot="{ componentField }" name="password">
        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <div class="relative">
              <Lock class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input v-bind="componentField" :type="showPassword ? 'text' : 'password'" placeholder="Password"
                class="pl-10 pr-10" required minlength="6" />
              <button type="button" @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                <EyeOff v-if="showPassword" class="w-4 h-4" />
                <Eye v-else class="w-4 h-4" />
              </button>
            </div>
          </FormControl>
          <FormMessage />
          <FormDescription>
            <NuxtLink :to="APP_ROUTES.forgotPassword.path" class="text-right text-sm text-primary hover:underline"
              :aria-label="APP_ROUTES.forgotPassword.name">
              Forgot password ?
            </NuxtLink>
          </FormDescription>
        </FormItem>
      </FormField> -->

      <!-- <Button type="submit" class="w-full bg-primary hover:opacity-90" :disabled="isSubmitting">
        {{ isSubmitting ? 'Please wait...' : 'Sign In' }}
      </Button> -->
    </form>

    <!-- Toggle login/signup -->
    <!-- <p class="text-center text-sm text-muted-foreground">
      Don't have an account?

      <NuxtLink to="/register" class="text-primary hover:underline font-medium ml-1">
        Sign up
      </NuxtLink>
    </p> -->
  </LayoutAuthCard>
</template>