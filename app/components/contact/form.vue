<script setup lang="ts">
import { Send } from "@lucide/vue";

const { submit, isSubmitting } = useContactForm();


</script>
<template>
  <Card>
    <CardHeader>
      <h3 class="font-semibold text-lg">Get in Touch</h3>
      <p class="text-muted-foreground text-sm">
        Fill out the form below and our advertising team will contact you
        shortly.
      </p>
    </CardHeader>

    <form @submit.prevent="submit" class="space-y-6 p-6">
      <div class="grid md:grid-cols-2 gap-4">
        <FormField v-slot="{ componentField }" name="name">
          <FormItem>
            <FormLabel for="name">Full Name *</FormLabel>
            <FormControl>
              <Input id="name" v-bind="componentField" placeholder="John Doe" required />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="email">
          <FormItem>
            <FormLabel for="email">Email Address *</FormLabel>
            <FormControl>
              <Input id="email" v-bind="componentField" type="email" placeholder="john@company.com" required />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>

      <FormField v-slot="{ componentField }" name="company">
        <FormItem>
          <FormLabel for="company">Company / Organization</FormLabel>
          <FormControl>
            <Input id="company" v-bind="componentField" placeholder="Your company name" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <div class="grid md:grid-cols-2 gap-4">
        <FormField v-slot="{ componentField }" name="type">
          <FormItem>
            <FormLabel for="inquiryType">Inquiry Type *</FormLabel>
            <FormControl>
              <Select v-bind="componentField" required class="w-full">
                <SelectTrigger class="w-full">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem v-for="type in contactTypeOptions" :key="type.value" :value="type.value">
                    {{ type.label }}
                  </SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>

      <div class="space-y-2">
        <FormField v-slot="{ componentField }" name="message">
          <FormItem>
            <FormLabel for="message">Message *</FormLabel>
            <FormControl>
              <Textarea id="message" v-bind="componentField" rows="5"
                placeholder="Tell us about your advertising goals and target audience..." required />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>

      <Button type="submit" class="w-full bg-primary hover:opacity-90" :disabled="isSubmitting">
        <Spinner v-if="isSubmitting" />
        <Send v-else class="w-4 h-4 mr-2" />
        Send Inquiry
      </Button>
    </form>
  </Card>
</template>