<script setup lang="ts">
import { Edit, MoreHorizontal } from "lucide-vue-next";
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
</script>
<template>
  <!-- Mobile View -->
  <div class="space-y-3">
    <div v-for="user in users" :key="user.id" class="bg-card rounded-2xl p-4 card-interactive">
      <div class="flex items-center gap-3">
        <Avatar class="h-10 w-10">
          <AvatarImage :src="user.avatar ?? ''" :alt="user.name" />
          <AvatarFallback>
            {{
              user.name
                .split(" ")
                .map((n) => n[0])
                .join("")
            }}
          </AvatarFallback>
        </Avatar>

        <div class="flex-1 min-w-0">
          <div class="font-medium text-sm hover:text-primary transition-colors truncate block">
            {{ user.name }}
          </div>

          <p class="text-xs text-muted-foreground truncate">
            {{ user.email }}
          </p>

          <div class="flex items-center gap-2 mt-1.5">
            <Badge class="text-[10px]" :class="getRoleBadgeColor(user.role)">
              {{ user.role.charAt(0).toUpperCase() + user.role.slice(1) }}
            </Badge>

            <!-- <Badge
              :variant="user.status === 'active' ? 'default' : 'secondary'"
              :class="`text-[10px] ${user.status === 'active' ? 'bg-green-600' : ''}`"
            >
              {{ user.status.charAt(0).toUpperCase() + user.status.slice(1) }}
            </Badge> -->
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="ghost" size="icon" class="h-8 w-8 shrink-0">
              <MoreHorizontal class="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" class="bg-card">
            <DropdownMenuItem class="gap-2" @click="$emit('edit', user)">
              <Edit class="w-4 h-4" />
              Edit
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <!-- <DropdownMenuItem
              @click="handleToggleStatus(user)"
              :class="`gap-2 ${user.status === 'active' ? 'text-destructive' : 'text-green-600'}`"
            >
              <template v-if="user.status === 'active'">
                <UserX class="w-4 h-4" />
                Deactivate
              </template>

<template v-else>
                <UserCheck class="w-4 h-4" />
                Activate
              </template>
</DropdownMenuItem> -->
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  </div>
</template>
