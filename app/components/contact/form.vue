<script setup lang="ts">
import { Send } from "lucide-vue-next";

const isSubmitting = ref(false);

const formData = ref({
  name: "",
  email: "",
  company: "",
  inquiryType: "",
  budget: "",
  message: "",
});

const { success } = useToast();

async function handleSubmit() {
  isSubmitting.value = true;
  await new Promise((resolve) => setTimeout(resolve, 1500));

  success('Message Sent!',
    'Thank you for your inquiry. Our team will get back to you within 24-48 hours.'
  );

  formData.value = {
    name: "",
    email: "",
    company: "",
    inquiryType: "",
    budget: "",
    message: "",
  };
  isSubmitting.value = false;
}

const INQUIRY_TYPES = [
  { value: "display", label: "Display Advertising" },
  { value: "sponsored", label: "Sponsored Content" },
  { value: "native", label: "Native Advertising" },
  { value: "newsletter", label: "Newsletter Sponsorship" },
  { value: "partnership", label: "Brand Partnership" },
  { value: "other", label: "Other" },
];
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

    <form @submit.prevent="handleSubmit" class="space-y-6 p-6">
      <div class="grid md:grid-cols-2 gap-4">
        <div class="space-y-2">
          <Label for="name">Full Name *</Label>
          <Input id="name" v-model="formData.name" placeholder="John Doe" required />
        </div>
        <div class="space-y-2">
          <Label for="email">Email Address *</Label>
          <Input id="email" v-model="formData.email" type="email" placeholder="john@company.com" required />
        </div>
      </div>

      <div class="space-y-2">
        <Label for="company">Company / Organization</Label>
        <Input id="company" v-model="formData.company" placeholder="Your company name" />
      </div>

      <div class="grid md:grid-cols-2 gap-4">
        <div class="space-y-2">
          <Label for="inquiryType">Inquiry Type *</Label>
          <Select v-model="formData.inquiryType" required class="w-full">
            <SelectTrigger class="w-full">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="type in INQUIRY_TYPES" :key="type.value" :value="type.value">
                {{ type.label }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <!-- <div class="space-y-2">
          <Label for="budget">Monthly Budget</Label>
          <select id="budget" v-model="formData.budget"
            class="w-full rounded-md border border-border bg-transparent px-3 py-2 text-sm">
            <option disabled value="">Select range</option>
            <option value="under5k">Under $5,000</option>
            <option value="5k-15k">$5,000 - $15,000</option>
            <option value="15k-50k">$15,000 - $50,000</option>
            <option value="50k-100k">$50,000 - $100,000</option>
            <option value="over100k">Over $100,000</option>
          </select>
        </div> -->
      </div>

      <div class="space-y-2">
        <Label for="message">Message *</Label>
        <Textarea id="message" v-model="formData.message" rows="5"
          placeholder="Tell us about your advertising goals and target audience..." required />
      </div>

      <Button type="submit" class="w-full bg-primary hover:opacity-90" :disabled="isSubmitting">
        <template v-if="isSubmitting">Sending...</template>
        <template v-else>
          <Send class="w-4 h-4 mr-2" />
          Send Inquiry
        </template>
      </Button>
    </form>
  </Card>
</template>