<script setup lang="ts">
import { UserRole } from "~/enums/roles.enum";

import type { UserAdminData } from "~/types";

interface Props {
  users: UserAdminData[];
}

interface Emits {
  (e: "edit" | "delete", item: UserAdminData): void;
}

defineProps<Props>();
defineEmits<Emits>();

function getRoleBadgeColor(role: UserRole) {
  switch (role) {
    case UserRole.ADMIN:
      return "bg-primary text-primary-foreground";
    case UserRole.EDITOR:
      return "bg-accent text-accent-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
}

const { isMobile } = useMobile('md');
</script>

<template>
  <UserListMobile v-if="isMobile" :users="users" :role-color="getRoleBadgeColor" @edit="$emit('edit', $event)" />
  <UserListDesktop v-else :users="users" :role-color="getRoleBadgeColor" @edit="$emit('edit', $event)" />
</template>
