<script setup lang="ts">
import { useError } from '#app'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Home, ArrowLeft, Search, AlertTriangle } from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()

const searchQuery = ref('')

const error = useError()

onMounted(() => {
  console.error('404 Error: User attempted to access non-existent route:', error?.value?.statusMessage || 'unknown')
})
onMounted(() => {
  console.error('404 Error: User attempted to access non-existent route:', route.fullPath)
})

function handleSearch(e: Event) {
  e.preventDefault()
  console.log('Searching for:', searchQuery.value)
  // Example: navigate to a search results page
  // router.push(`/search?q=${encodeURIComponent(searchQuery.value)}`)
}
</script>

<template>
  <div
    class="min-h-screen bg-linear-to-br from-background via-background to-muted/30 flex items-center justify-center p-4">
    <div class="max-w-lg w-full text-center">
      <!-- Error Icon -->
      <div class="w-24 h-24 mx-auto mb-8 rounded-full bg-destructive/10 flex items-center justify-center">
        <AlertTriangle class="w-12 h-12 text-destructive" />
      </div>

      <!-- Error Code -->
      <h1 class="text-8xl font-display font-bold text-primary mb-4">404</h1>

      <!-- Error Message -->
      <h2 class="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p class="text-muted-foreground mb-8">
        Sorry, we couldn't find the page you're looking for. The page may have been moved, deleted, or never existed.
      </p>

      <!-- Attempted Path -->
      <div class="bg-muted/50 rounded-lg p-4 mb-8">
        <p class="text-sm text-muted-foreground">
          Attempted URL:
          <code class="text-foreground">{{ route.fullPath }}</code>
        </p>
      </div>

      <!-- Search Box -->
      <form @submit="handleSearch" class="mb-8">
        <div class="relative max-w-sm mx-auto">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search for articles..." v-model="searchQuery" class="pl-10 pr-4" />
        </div>
      </form>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <Button variant="outline" @click="router.back()">
          <ArrowLeft class="w-4 h-4 mr-2" />
          Go Back
        </Button>

        <Button class="bg-primary hover:opacity-90" @click="router.push('/')">
          <Home class="w-4 h-4 mr-2" />
          Return Home
        </Button>
      </div>

      <!-- Help Links -->
      <div class="mt-12 pt-8 border-t border-border">
        <p class="text-sm text-muted-foreground mb-4">Here are some helpful links:</p>
        <div class="flex flex-wrap justify-center gap-4 text-sm">
          <NuxtLink to="/" class="text-primary hover:underline">Home</NuxtLink>
          <NuxtLink to="/contact" class="text-primary hover:underline">Contact Us</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
