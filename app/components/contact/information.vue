<script setup lang="ts">
import {
  Mail,
  Phone,
  MapPin,
  Clock,
} from "lucide-vue-next";

const CONTACT_INFORMATION = [
  {
    label: "Email",
    icon: Mail,
    value: "advertise@oneclickafrica.com",
    url: "advertise@oneclickafrica.com"
  },
  {
    label: "Phone",
    icon: Phone,
    value: "+234 123 456 789",
    url: "tel:+234123456789"
  },
  {
    label: "Office",
    icon: MapPin,
    value: "Lagos",
  },
  {
    label: "Response Time",
    icon: Clock,
    value: "Within 24-48 hours"
  }
]

</script>
<template>
  <Card>
    <CardHeader>
      <h3 class="font-semibold text-lg">Contact Information</h3>
    </CardHeader>
    <div class="space-y-4 p-6">
      <div v-for="(item, index) in CONTACT_INFORMATION" :key="index" class="flex items-start gap-4">
        <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <component :is="item.icon" class="w-5 h-5 text-primary" />
        </div>
        <div>
          <p class="font-medium">{{ item.label }}</p>
          <NuxtLink v-if="item.url" :href="item.url" target="__blank" rel="noopener noreferrer"
            class="text-muted-foreground hover:text-primary">{{ item.value }}
          </NuxtLink>
          <p v-else class="text-muted-foreground">{{ item.value }}</p>
        </div>
      </div>
    </div>
  </Card>
</template>