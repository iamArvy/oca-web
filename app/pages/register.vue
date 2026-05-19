<script setup lang="ts">
import { ref, watchEffect } from "vue"
import { useRouter } from "vue-router"
const { submit, isSubmitting, name, email, password, errors } = useRegisterForm();
const { passwordButton, toggleHidePassword } = usePasswordButton()

import { APP_ROUTES } from "~/constants";


definePageMeta({
  layout: "auth",
});

// const router = useRouter()


// const { user } = useAuth()

// watchEffect(() => {
//   if (user.value) {
//     router.push("/")
//   }
// })

</script>

<template>
  <LayoutAuthCard>
    <template #title>
      Create Account
    </template>

    <template #description>
      Join the OneClick Africa community today
    </template>

    <form @submit.prevent="submit">
      <FieldGroup>
        <FieldSet>
          <Field>
            <FieldLabel for="register-name-field">
              Full Name
            </FieldLabel>
            <InputGroup>
              <InputGroupInput id="register-name-field" placeholder="John Doe" v-model="name" required />
              <InputGroupAddon align="inline-start">
                <Icon name="lucide:user" />
              </InputGroupAddon>
            </InputGroup>
            <FieldError v-if="errors.name">{{ errors.name }}</FieldError>
          </Field>
          <FieldGroup>
            <Field>
              <FieldLabel for="register-email-field">
                Email Address
              </FieldLabel>
              <InputGroup>
                <InputGroupInput id="register-email-field" type="email" placeholder="youremail@domain.com"
                  v-model="email" required />
                <InputGroupAddon align="inline-start">
                  <Icon name="lucide:mail" />
                </InputGroupAddon>
              </InputGroup>
              <FieldError v-if="errors.email">{{ errors.email }}</FieldError>
            </Field>
            <Field>
              <FieldLabel for="login-password-field" class="justify-between">
                Password
              </FieldLabel>
              <InputGroup>
                <InputGroupInput id="login-password-field" placeholder="Enter Password" :type="passwordButton.type"
                  v-model="password" required />
                <InputGroupAddon align="inline-start">
                  <Icon name="lucide:lock" />
                </InputGroupAddon>
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
            <p class="text-center">
              Already have an account?
              <NuxtLink :to="APP_ROUTES.login.path" class="text-primary">
                Log in
              </NuxtLink>
            </p>
          </FieldGroup>
        </FieldSet>
      </FieldGroup>
    </form>
  </LayoutAuthCard>
</template>