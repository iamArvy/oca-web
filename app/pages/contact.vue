<script setup lang="ts">
const stats = [
  {
    value: "1M+",
    label: "Monthly Readers"
  },
  {
    value: "25+",
    label: "Global Countries Reached"
  },
  {
    value: "96%",
    label: "Mobile Engagement Rate"
  }
]
</script>

<template>
  <main class="container-lg py-12">
    <div class="text-center mb-12">
      <h1 class="text-4xl md:text-5xl font-display font-bold mb-4">
        Advertise with <span class="text-primary">OneClickAfrica</span>
      </h1>
      <p class="text-xl text-muted-foreground max-w-2xl mx-auto">
        Reach millions of engaged readers across Africa. Partner with us to
        amplify your brand's message.
      </p>
    </div>

    <div class="grid lg:grid-cols-3 gap-8 mb-12">
      <Card v-for="({ label, value }, index) in stats" :key="index" class="text-center">
        <CardHeader>
          <h3 class="text-4xl font-bold text-primary">{{ value }}</h3>
          <p class="text-muted-foreground">{{ label }}</p>
        </CardHeader>
      </Card>
    </div>

    <div class="grid lg:grid-cols-2 gap-12">
      <div>
        <ContactForm />
      </div>

      <!-- Contact Info / Formats -->
      <div class="space-y-6">
        <ContactInformation />
        <ContactFormat />
      </div>
    </div>
  </main>
</template>
