<script setup lang="ts">
import { User } from 'lucide-vue-next'
import { APP_ROUTES } from '~/constants';

const { user, loggedIn, clear } = useUserSession()
</script>

<template>
  <DropdownMenu v-if="loggedIn && user">
    <DropdownMenuTrigger>
      <Avatar>
        <AvatarImage :src="user.avatar ?? ''" :alt="user.name" />
        <AvatarFallback>{{ getInitials(user.name) }}</AvatarFallback>
      </Avatar>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem @click="$router.push(APP_ROUTES.profile.path)">Profile</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem @click="clear">Logout</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  <NuxtLink v-else to="/login">
    <Button variant="ghost" size="icon" class="hover:bg-muted">
      <User class="w-5 h-5" />
    </Button>
  </NuxtLink>
</template>
