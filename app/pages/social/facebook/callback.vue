<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {
  CheckCircle2,
  Loader2,
  ArrowLeft,
} from '@lucide/vue'
import { API_ROUTES } from '~/constants'
import type { ApiListResponse, ApiResponse } from '~/types'

definePageMeta({
  layout: "empty",
});

interface Page {
  id: string
  name: string
}

interface AuthResponse {
  pages: Page[],
  stateKey: string,
}

const route = useRoute()

if (!route.query.code) {
  throw createError({
    status: 404,
    statusText: "Bad Request",
  });
}

const code = route.query.code as string;


const pages = ref<Page[]>([])
const stateKey = ref<string>()
const authorizing = ref(true)
const selectedId = ref<string | null>(null)
const saving = ref(false)

const { $api } = useNuxtApp();
const { success, error } = useToast();



const authorize = async () => {
  try {
    const res = await $api<ApiResponse<AuthResponse>>(
      API_ROUTES.socials.facebook.callback,
      {
        query: {
          code,
        },
        method: "GET",
      },
    );

    pages.value = res.data.pages;
    stateKey.value = res.data.stateKey;
  } catch (e) {
    console.error(e)
    error(handleError(e, "Error Authorizing code"));
  } finally {
    authorizing.value = false
  }
}

const handleConnect = async () => {
  if (!selectedId.value) {
    return
  }

  try {
    saving.value = true
    const res = await $api<ApiResponse>(
      API_ROUTES.socials.facebook.connect,
      {
        body: {
          pageId: selectedId.value,
          stateKey: stateKey.value
        },
        method: "POST",
      },
    );
    success(res.message);
    await navigateTo('/admin/settings')
  } catch (e) {
    error(handleError(e, "Error connecting page"));
  } finally {
    saving.value = false
  }
}

onMounted(
  authorize
)
</script>

<template>
  <div v-if="authorizing" class="min-h-[60vh] flex items-center justify-center">
    <div class="bg-card rounded-2xl p-10 max-w-md w-full text-center space-y-6">
      <div class="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center text-white"
        :style="{ backgroundColor: '#1877F2' }">
        <Icon name="lucide:facebook" class="w-8 h-8" />
      </div>

      <div>
        <h2 class="font-display text-xl font-bold">
          Connecting to Facebook Pages
        </h2>

        <p class="text-sm text-muted-foreground mt-1">
          Verifying authorization and loading your pages...
        </p>
      </div>

      <Loader2 class="w-6 h-6 animate-spin mx-auto text-primary" />
    </div>
  </div>

  <div v-else class="space-y-6 max-w-3xl">
    <div>
      <NuxtLink to="/admin/settings"
        class="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft class="w-4 h-4" />
        Back to settings
      </NuxtLink>

      <div class="mt-3 flex items-center gap-3">
        <div class="w-12 h-12 rounded-xl flex items-center justify-center text-white"
          :style="{ backgroundColor: '#1877F2' }">
          <Icon name="lucide:facebook" class="w-6 h-6" />
        </div>

        <div>
          <h1 class="font-display text-2xl font-bold">
            Select a Facebook page
          </h1>

          <p class="text-sm text-muted-foreground">
            Choose which page to link.
          </p>
        </div>
      </div>
    </div>

    <div class="bg-card rounded-2xl p-6 space-y-4">
      <div class="space-y-2">
        <button v-for="page in pages" :key="page.id" type="button"
          class="w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left" :class="selectedId === page.id
            ? 'border-primary bg-primary/5 ring-2 ring-primary/30'
            : 'border-border hover:bg-background'
            " @click="selectedId = page.id">

          <div class="flex-1 min-w-0">
            <div class="font-semibold truncate">
              {{ page.name }}
            </div>

          </div>

          <CheckCircle2 v-if="selectedId === page.id" class="w-5 h-5 text-primary shrink-0" />
        </button>
      </div>
    </div>

    <div class="flex items-center justify-between gap-4 flex-wrap">
      <Badge variant="outline" class="text-muted-foreground">
        {{ pages.length }}
        page{{ pages.length !== 1 ? 's' : '' }}
        available
      </Badge>

      <div class="flex gap-2">
        <Button variant="outline" @click="navigateTo('/admin/settings')">
          Cancel
        </Button>

        <Button class="gap-2" :disabled="!selectedId || saving" @click="handleConnect">
          <Loader2 v-if="saving" class="w-4 h-4 animate-spin" />
          Connect page
        </Button>
      </div>
    </div>
  </div>
</template>