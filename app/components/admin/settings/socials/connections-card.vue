<script setup lang="ts">
import {
  Link2,
  CheckCircle2,
  AlertTriangle,
} from '@lucide/vue'
import { API_ROUTES } from '~/constants'
import type { ApiListResponse, SocialPlatform, ApiResponse } from '~/types'



const { success, error } = useToast();
const { $api } = useNuxtApp();

const connect = async (route: string) => {
  try {
    const { data: url } = await $api<ApiResponse<string>>(
      route,
      {
        method: "GET",
      },
    );
    window.location.href = url
  } catch (e) {
    error(handleError(e, "Error connecting platform"));
  }
}

const disconnect = async (platform: string) => {
  try {
    const res = await $api<ApiResponse>(
      API_ROUTES.admin.socialPlatform(platform),
      {
        method: "DELETE",
      },
    );
    success(res.message);
    await refreshNuxtData();
  } catch (e) {
    error(handleError(e, "Error disconnecting platform"));
  }
}

const { data: socialPlatforms } = useAPI<ApiListResponse<SocialPlatform>>(API_ROUTES.admin.socialPlatforms)

const platforms = {
  facebook: {
    platform: socialPlatforms.value?.data.find(
      (p: SocialPlatform) => p.platform === 'facebook',
    ),
    icon: 'lucide:facebook',
    brand: '#1877F2',
    name: 'Facebook',
    connectUrl: API_ROUTES.socials.facebook.authorize
  },
  linkedin: {
    platform: socialPlatforms.value?.data.find(
      (p: SocialPlatform) => p.platform === 'linkedin',
    ),
    icon: 'lucide:linkedin',
    brand: '#0A66C2',
    name: 'Linkedin',
    connectUrl: API_ROUTES.socials.linkedin.authorize
  }
}
</script>

<template>
  <div class="bg-card rounded-2xl p-6 card-interactive space-y-6">
    <div class="flex items-start justify-between gap-4 flex-wrap">
      <div>
        <h2 class="font-display text-lg font-bold flex items-center gap-2">
          Connected Accounts
        </h2>

        <p class="text-sm text-muted-foreground mt-1">
          Link the company's social pages to publish content
          automatically.
        </p>
      </div>
    </div>

    <div class="space-y-3">
      <div v-for="provider in ['facebook', 'linkedin']" :key="provider"
        class="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl border border-border bg-background/50 hover:bg-background transition-colors">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0"
            :style="{ backgroundColor: platforms[provider].brand }">
            <Icon :name="platforms[provider].icon" class="w-6 h-6" />
          </div>

          <div class="min-w-0">
            <div class="flex items-center gap-2 flex-wrap">
              <h3 class="font-semibold">
                {{ platforms[provider].name }}
              </h3>

              <!-- Connected -->
              <Badge v-if="!platforms[provider].platform" variant="outline" class="gap-1 text-muted-foreground">
                Not connected
              </Badge>
              <template v-else>
                <Badge v-if="!platforms[provider].platform.isExpired" variant="outline"
                  class="gap-1 border-emerald-500/40 text-emerald-500 bg-emerald-500/10">
                  <CheckCircle2 class="w-3 h-3" />
                  Connected
                </Badge>

                <Badge v-else variant="outline" class="gap-1 border-amber-500/40 text-amber-500 bg-amber-500/10">
                  <AlertTriangle class="w-3 h-3" />
                  Expired
                </Badge>
              </template>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-2 shrink-0">
          <Button v-if="!platforms[provider].platform" @click="connect(platforms[provider].connectUrl)">
            <Link2 class="w-4 h-4" />
            Authorize
          </Button>
          <template v-else>
            <Button size="sm" class="gap-2" variant="secondary" @click="connect(platforms[provider].connectUrl)">
              <Icon name="lucide:refresh-ccw" class="w-4 h-4" />
              Reconnect
            </Button>
            <Button variant="outline" size="sm" class="gap-2"
              @click="disconnect(platforms[provider].platform.platform)">
              <Icon name="lucide:unplug" class="w-4 h-4" />
              Disconnect
            </Button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>