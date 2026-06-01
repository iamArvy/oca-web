<script setup lang="ts">
import type { UserAdminData } from "~/types";

type Mode = "edit" | "create";
const props = defineProps<{
  user: UserAdminData | null;
  mode: Mode;
}>();
defineEmits<{
  (e: "save", data: Partial<UserAdminData>): void;
  (e: "cancel"): void;
}>();

const { onSubmit, userRoleOptions, mode } = useUserEditor(
  props.user,
  props.mode,
);
</script>

<template>
  <form class="space-y-6" @submit.prevent="onSubmit">
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
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input v-bind="componentField" placeholder="example@example.com" type="email" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="role">
      <FormItem>
        <FormLabel>Role</FormLabel>
        <FormControl>
          <Select v-bind="componentField">
            <SelectTrigger>
              <SelectValue placeholder="Select Role" />
            </SelectTrigger>
            <SelectContent class="bg-card">
              <SelectItem v-for="role in userRoleOptions" :key="role" :value="role">{{ role }}</SelectItem>
            </SelectContent>
          </Select>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <div v-if="mode === 'create'" class="md:grid grid-cols-2 space-x-3 space-y-3">
      <FormField v-slot="{ componentField }" name="password">
        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <div class="relative mt-1.5">
              <Input v-bind="componentField" type="password" placeholder="Enter User Password" />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="confirmPassword">
        <FormItem>
          <FormLabel>Confirm Password</FormLabel>
          <FormControl>
            <div class="relative mt-1.5">
              <Input v-bind="componentField" type="password" placeholder="Confirm User Password" />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>

    <DialogFooter>
      <Button variant="outline" type="button" @click="$emit('cancel')">Cancel</Button>
      <Button type="submit" class="bg-primary hover:opacity-90">Save</Button>
    </DialogFooter>
  </form>
</template>
