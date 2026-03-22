<script setup lang="ts">
import { APP_ROUTES } from '~/constants';

const { user, clear } = useUserSession()
const router = useRouter()
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
      <DropdownMenuItem @click="router.push(APP_ROUTES.profile.path)">Profile</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem @click="clear">Logout</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
