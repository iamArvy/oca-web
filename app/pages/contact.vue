<script setup lang="ts">
import { ref } from "vue";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  ArrowLeft,
  Building2,
  Clock,
} from "lucide-vue-next";

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
</script>

<template>
  <main class="container-lg py-12">
    <!-- Hero -->
    <div class="text-center mb-12">
      <h1 class="text-4xl md:text-5xl font-display font-bold mb-4">
        Advertise with <span class="text-primary">AfricaNews</span>
      </h1>
      <p class="text-xl text-muted-foreground max-w-2xl mx-auto">
        Reach millions of engaged readers across Africa. Partner with us to
        amplify your brand's message.
      </p>
    </div>

    <!-- Stats -->
    <div class="grid lg:grid-cols-3 gap-8 mb-12">
      <Card class="text-center">
        <CardHeader>
          <h3 class="text-4xl font-bold text-primary">2.5M+</h3>
          <p class="text-muted-foreground">Monthly Readers</p>
        </CardHeader>
      </Card>
      <Card class="text-center">
        <CardHeader>
          <h3 class="text-4xl font-bold text-primary">54</h3>
          <p class="text-muted-foreground">African Countries Reached</p>
        </CardHeader>
      </Card>
      <Card class="text-center">
        <CardHeader>
          <h3 class="text-4xl font-bold text-primary">85%</h3>
          <p class="text-muted-foreground">Mobile Engagement Rate</p>
        </CardHeader>
      </Card>
    </div>

    <div class="grid lg:grid-cols-2 gap-12">
      <!-- Contact Form -->
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
              <select id="inquiryType" v-model="formData.inquiryType" required
                class="w-full rounded-md border border-border bg-transparent px-3 py-2 text-sm">
                <option disabled value="">Select type</option>
                <option value="display">Display Advertising</option>
                <option value="sponsored">Sponsored Content</option>
                <option value="native">Native Advertising</option>
                <option value="newsletter">Newsletter Sponsorship</option>
                <option value="partnership">Brand Partnership</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div class="space-y-2">
              <Label for="budget">Monthly Budget</Label>
              <select id="budget" v-model="formData.budget"
                class="w-full rounded-md border border-border bg-transparent px-3 py-2 text-sm">
                <option disabled value="">Select range</option>
                <option value="under5k">Under $5,000</option>
                <option value="5k-15k">$5,000 – $15,000</option>
                <option value="15k-50k">$15,000 – $50,000</option>
                <option value="50k-100k">$50,000 – $100,000</option>
                <option value="over100k">Over $100,000</option>
              </select>
            </div>
          </div>

          <div class="space-y-2">
            <Label for="message">Message *</Label>
            <Textarea id="message" v-model="formData.message" rows="5"
              placeholder="Tell us about your advertising goals and target audience..." required />
          </div>

          <Button type="submit" class="w-full bg-gradient-hero hover:opacity-90" :disabled="isSubmitting">
            <template v-if="isSubmitting">Sending...</template>
            <template v-else>
              <Send class="w-4 h-4 mr-2" />
              Send Inquiry
            </template>
          </Button>
        </form>
      </Card>

      <!-- Contact Info / Formats -->
      <div class="space-y-6">
        <Card>
          <CardHeader>
            <h3 class="font-semibold text-lg">Contact Information</h3>
          </CardHeader>
          <div class="space-y-4 p-6">
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Mail class="w-5 h-5 text-primary" />
              </div>
              <div>
                <p class="font-medium">Email</p>
                <a href="mailto:advertise@africanews.com"
                  class="text-muted-foreground hover:text-primary">advertise@africanews.com</a>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Phone class="w-5 h-5 text-primary" />
              </div>
              <div>
                <p class="font-medium">Phone</p>
                <a href="tel:+234123456789" class="text-muted-foreground hover:text-primary">+234 123 456 789</a>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <MapPin class="w-5 h-5 text-primary" />
              </div>
              <div>
                <p class="font-medium">Office</p>
                <p class="text-muted-foreground">
                  Lagos, Nigeria & Nairobi, Kenya
                </p>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Clock class="w-5 h-5 text-primary" />
              </div>
              <div>
                <p class="font-medium">Response Time</p>
                <p class="text-muted-foreground">Within 24-48 hours</p>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <CardHeader>
            <h3 class="font-semibold text-lg">Advertising Formats</h3>
            <p class="text-muted-foreground text-sm">
              Choose from our range of advertising solutions
            </p>
          </CardHeader>

          <div class="space-y-4 p-6">
            <div v-for="format in [
              { title: 'Display Advertising', desc: 'Banner ads, sidebar placements, and interstitials' },
              { title: 'Sponsored Content', desc: 'Native articles and branded storytelling' },
              { title: 'Newsletter Sponsorship', desc: 'Reach our 500K+ email subscribers' },
              { title: 'Brand Partnerships', desc: 'Long-term strategic collaborations' }
            ]" :key="format.title" class="flex items-start gap-4 p-3 rounded-lg bg-muted/50">
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
      </div>
    </div>
  </main>
</template>
