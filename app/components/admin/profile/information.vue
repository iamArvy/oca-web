<script setup lang="ts">
import { User as UserIcon, Save } from "lucide-vue-next";

const { user } = useAuth();

const { onSubmit, meta } = useProfileInformationForm(user.value);
</script>
<template>
  <Card>
    <CardHeader>
      <CardTitle>Profile Information</CardTitle>
      <CardDescription>Update your account details here.</CardDescription>
    </CardHeader>

    <CardContent>
      <form @submit.prevent="onSubmit" class="space-y-6">
        <!-- <AdminProfileHeader :icon="UserIcon" label="Personal Information" /> -->
        <FormField v-slot="{ componentField }" name="name">
          <FormItem>
            <FormLabel>Full Name</FormLabel>
            <FormControl>
              <Input v-bind="componentField" placeholder="Enter full name" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="email">
          <FormItem>
            <FormLabel>Email Address</FormLabel>
            <FormControl>
              <Input v-bind="componentField" placeholder="Enter email address" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <div class="flex justify-end">
          <Button :disabled="!meta.valid" class="bg-primary hover:opacity-90 gap-2">
            <Save class="w-4 h-4" /> Save Changes
          </Button>
        </div>
      </form>
    </CardContent>
  </Card>
</template>
