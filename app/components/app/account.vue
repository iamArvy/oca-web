<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const { user, clear } = useUserSession()
</script>

<template>
  <DropdownMenu v-if="user">
    <DropdownMenuTrigger>
      <Avatar>
        <AvatarImage :src="user.avatar ?? ''" :alt="user.name" />
        <AvatarFallback>{{ getInitials(user.name) }}</AvatarFallback>
      </Avatar>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>Profile</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem @click="clear">Logout</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
