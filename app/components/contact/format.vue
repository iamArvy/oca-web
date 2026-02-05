<script setup lang="ts">
import { Building2 } from "lucide-vue-next";

const formats = [
  { title: 'Display Advertising', desc: 'Banner ads, sidebar placements, and interstitials' },
  { title: 'Sponsored Content', desc: 'Native articles and branded storytelling' },
  { title: 'Newsletter Sponsorship', desc: 'Reach our 500K+ email subscribers' },
  { title: 'Brand Partnerships', desc: 'Long-term strategic collaborations' }
]
</script>

<template>
  <Card>
    <CardHeader>
      <h3 class="font-semibold text-lg">Advertising Formats</h3>
      <p class="text-muted-foreground text-sm">
        Choose from our range of advertising solutions
      </p>
    </CardHeader>

    <div class="space-y-4 p-6">
      <div v-for="format in formats" :key="format.title" class="flex items-start gap-4 p-3 rounded-lg bg-muted/50">
        <Building2 class="w-5 h-5 text-primary mt-0.5" />
        <div>
          <p class="font-medium">{{ format.title }}</p>
          <p class="text-sm text-muted-foreground">
            {{ format.desc }}
          </p>
        </div>
      </div>
    </div>
  </Card>
</template>