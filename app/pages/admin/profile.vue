<script setup lang="ts">
import { Camera } from "lucide-vue-next";
import { AdminProfileInformation, AdminProfileSecurity } from "#components";

definePageMeta({
  layout: "admin",
  middleware: ['admin'],
});

const { user, logout } = useAuth();

const router = useRouter()

const handleLogout = () => {
  logout()
  router.push('/')
}
</script>
<template>
  <div class="space-y-6">
    <!-- <div class="bg-card rounded-2xl p-6 card-interactive">
      <div v-if="user" class="flex flex-col md:flex-row items-start md:items-center gap-6">
        <div class="relative">
          <Avatar class="w-24 h-24">
            <AvatarImage :src="user.avatar ?? ''" :alt="user.name" />
            <AvatarFallback class="text-2xl bg-primary text-primary-foreground">
              {{ user.name.charAt(0) }}
            </AvatarFallback>
          </Avatar>
          <button
            class="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-opacity">
            <Camera class="w-4 h-4" />
          </button>
        </div>
        <div class="flex-1">
          <h2 class="font-display text-2xl font-bold">
            {{ user.name }}
          </h2>
          <p class="text-muted-foreground">{{ user.email }}</p>
          <div class="flex items-center gap-2 mt-2">
            <span
              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary capitalize">
              {{ user.role }}
            </span>
            <span class="text-xs text-muted-foreground">
              Member since
              {{ new Date(user.createdAt).toLocaleDateString() }}
            </span>
          </div>
        </div>
      </div>
    </div> -->
    <Card v-if="user" class="mb-8">
      <CardContent class="pt-6">
        <div class="flex flex-col md:flex-row items-center gap-6">

          <!-- Avatar -->
          <div class="relative">
            <Avatar class="w-24 h-24">
              <AvatarImage :src="user?.avatar ?? ''" :alt="user?.name" />
              <AvatarFallback class="text-2xl bg-primary text-primary-foreground">
                {{ getInitials(user?.name || 'U') }}
              </AvatarFallback>
            </Avatar>

            <button
              class="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
              <Icon name="lucide:camera" class="w-4 h-4" />
            </button>
          </div>

          <!-- Info -->
          <div class="text-center md:text-left flex-1">
            <h1 class="text-2xl font-bold">{{ user?.name }}</h1>
            <p class="text-muted-foreground">{{ user?.email }}</p>
            <div class="flex items-center gap-2 mt-2">
              <span
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary capitalize">
                {{ user.role }}
              </span>
              <span class="text-xs text-muted-foreground">
                Member since
                {{ new Date(user.createdAt).toLocaleDateString() }}
              </span>
            </div>
            <div class="flex items-center justify-center md:justify-start gap-4 mt-2 text-sm text-muted-foreground">
              <span class="flex items-center gap-1">
                <Icon name="lucide:calendar" class="w-4 h-4" />
                Member since
                {{
                  new Date(user?.createdAt || '').toLocaleDateString('en-US', {
                    month: 'long',
                    year: 'numeric'
                  })
                }}
              </span>
            </div>
          </div>

          <!-- Logout -->
          <Button variant="destructive" @click="handleLogout">
            <Icon name="lucide:log-out" class="w-4 h-4 mr-2" />
            Logout
          </Button>

        </div>
      </CardContent>
    </Card>
    <div class="grid lg:grid-cols-2 gap-6">
      <AdminProfileInformation v-if="user" :user="user" />
      <AdminProfileSecurity v-if="user" :user="user" />
    </div>
  </div>
</template>
