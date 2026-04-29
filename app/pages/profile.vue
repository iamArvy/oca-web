<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useToast } from '@/composables/useToast'

import { Camera, Mail, User, Calendar, LogOut, Bell, Shield } from 'lucide-vue-next'

const router = useRouter()
const { user, logout } = useAuth()
const { success, info } = useToast()

// dark mode
// handlers
const handleProfileUpdate = () => {
  // updateProfile({ name: profileData.name })

  success('Profile Updated', 'Your profile has been updated successfully.')
}

const handleLogout = () => {
  logout()
  router.push('/')
}

definePageMeta({
  middleware: ['auth'],
})
</script>

<template>
  <main class="container py-12">
    <div class="max-w-4xl mx-auto">

      <!-- Profile Header -->
      <Card class="mb-8">
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
                <Camera class="w-4 h-4" />
              </button>
            </div>

            <!-- Info -->
            <div class="text-center md:text-left flex-1">
              <h1 class="text-2xl font-bold">{{ user?.name }}</h1>
              <p class="text-muted-foreground">{{ user?.email }}</p>

              <div class="flex items-center justify-center md:justify-start gap-4 mt-2 text-sm text-muted-foreground">
                <span class="flex items-center gap-1">
                  <Calendar class="w-4 h-4" />
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
              <LogOut class="w-4 h-4 mr-2" />
              Logout
            </Button>

          </div>
        </CardContent>
      </Card>

      <!-- Tabs -->
      <Tabs default-value="profile" class="space-y-6">
        <TabsList class="grid w-full grid-cols-3">
          <TabsTrigger value="profile">
            <User class="w-4 h-4" /> Profile
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell class="w-4 h-4" /> Notifications
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield class="w-4 h-4" /> Security
          </TabsTrigger>
        </TabsList>

        <!-- Profile -->
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your account details here.</CardDescription>
            </CardHeader>

            <CardContent>
              <form @submit.prevent="handleProfileUpdate" class="space-y-6">
                <div class="grid md:grid-cols-2 gap-6">

                  <!-- <div class="space-y-2">
                    <Label for="name">Full Name</Label>
                    <div class="relative">
                      <User class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input id="name" v-model="profileData.name" class="pl-10" />
                    </div>
                  </div>

                  <div class="space-y-2">
                    <Label for="email">Email Address</Label>
                    <div class="relative">
                      <Mail class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input id="email" type="email" v-model="profileData.email" class="pl-10" disabled />
                    </div>
                    <p class="text-xs text-muted-foreground">
                      Email cannot be changed
                    </p>
                  </div> -->

                </div>

                <Button type="submit">
                  Save Changes
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <!-- Security -->
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>

            <CardContent class="space-y-6">
              <Button variant="outline" @click="info('Coming Soon')">
                Change Password
              </Button>

              <Separator />

              <!-- <Button variant="destructive" @click=info('Coming Soon')">
                Delete Account
              </Button> -->
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>
    </div>
  </main>
</template>