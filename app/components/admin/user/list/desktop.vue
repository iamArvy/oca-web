<script setup lang="ts">
import { Edit, Trash2, MoreHorizontal } from "@lucide/vue";
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
  <div class="bg-card rounded-2xl card-interactive overflow-hidden">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <!-- <TableHead>Status</TableHead> -->
          <TableHead>Joined</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="item in users" :key="item.id" class="hover:bg-muted/50">
          <TableCell>
            <div class="flex items-center space-x-2">
              <Avatar class="h-9 w-9">
                <AvatarImage :src="item.avatar ?? ''" :alt="item.name" />

                <AvatarFallback>
                  {{
                    item.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                  }}
                </AvatarFallback>
              </Avatar>

              <span class="font-medium">
                {{ item.name }}
              </span>
            </div>
          </TableCell>
          <TableCell>{{ item.email }}</TableCell>
          <TableCell>
            <Badge :class="getRoleBadgeColor(item.role)">
              {{ item.role }}
            </Badge>
          </TableCell>
          <TableCell>
            {{ new Date(item.createdAt).toLocaleDateString() }}
          </TableCell>
          <TableCell>
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <Button variant="ghost" size="icon" class="h-8 w-8">
                  <MoreHorizontal class="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" class="bg-card">
                <DropdownMenuItem class="gap-2" @click="$emit('edit', item)">
                  <Edit class="w-4 h-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem class="gap-2 text-destructive focus:text-destructive" @click="$emit('delete', item)">
                  <Trash2 class="w-4 h-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
