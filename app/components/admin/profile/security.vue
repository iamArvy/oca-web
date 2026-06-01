<script setup lang="ts">
import { Save, Shield } from "lucide-vue-next";

const { onSubmit, meta } = useProfileSecurityForm();

const fields = [
  {
    name: "currentPassword",
    label: "Current Password",
    type: "password",
    placeholder: "Enter current password",
  },
  {
    name: "newPassword",
    label: "New Password",
    type: "password",
    placeholder: "Enter new password",
  },
  {
    name: "confirmPassword",
    label: "Confirm New Password",
    type: "password",
    placeholder: "Confirm new password",
  },
];
</script>
<template>
  <Card>
    <CardHeader>
      <CardTitle>Security Information</CardTitle>
      <CardDescription>Update your security settings here.</CardDescription>
    </CardHeader>

    <CardContent>
      <form class="space-y-6" @submit.prevent="onSubmit">
        <FormField v-for="field in fields" :key="field.name" v-slot="{ componentField }" :name="field.name">
          <FormItem>
            <FormLabel>{{ field.label }}</FormLabel>
            <FormControl>
              <div class="relative mt-1.5">
                <Input v-bind="componentField" type="password" :placeholder="field.placeholder" />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <div class="flex justify-end">
          <Button :disabled="!meta.valid" class="bg-primary hover:opacity-90 gap-2">
            <Icon name="lucide:save" class="w-4 h-4" /> Save Changes
          </Button>
        </div>
      </form>
    </CardContent>
  </Card>
</template>
