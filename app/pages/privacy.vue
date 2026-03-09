<script setup lang="ts">

const header = {
  title: "Privacy Policy",
  description: [
    "Your privacy is important to us at OneClickAfrica. This policy explains how we collect, use, protect, and manage your Personal Information when you interact with our website, blog, or app.",
  ]
}
const sections = [
  {
    title: "Information We Collect",
    content: [
      {
        type: "text" as const,
        value: "We may collect personal information such as location, device type, or other details when you register, place an order, subscribe to our newsletter, respond to a survey, or use our services."
      }
    ]
  },
  {
    title: "Collection Methods",
    content: [
      {
        type: "text" as const,
        value: "Information is gathered when you use Google location services, enter details on our site, or engage with our features."
      }
    ]
  },
  {
    title: "Use of Information",
    content: [
      {
        type: "text" as const,
        value: "We use your information to:"
      },
      {
        type: "list" as const,
        value: [
          "Personalize your experience with tailored content and offers",
          "Improve our website and services",
          "Respond to customer service requests efficiently",
          "Deliver relevant communications and updates"
        ]
      }
    ]
  },
  {
    title: "Protection of Data",
    content: [
      {
        type: "text" as const,
        value: "Our website is regularly scanned for vulnerabilities and is protected by routine malware checks. While we do not currently use SSL certificates, we only provide articles and information—we never request sensitive data such as credit card numbers or email addresses for private use."
      }
    ]
  },
  {
    title: "Cookies",
    content: [
      {
        type: "text" as const,
        value: "We use cookies to:"
      },
      {
        type: "list" as const,
        value: [
          "Optimize site functionality and user experience",
          "Track advertisements and aggregate site traffic data",
          "Remember preferences and enhance service delivery",
        ]
      },
      {
        type: "text" as const,
        value: "You may configure your browser to refuse cookies or to warn you when cookies are being sent. Disabling cookies may affect some site features but will not disrupt your ability to access core content."
      }
    ]
  },
  {
    title: "Third-Party Disclosure",
    content: [
      {
        type: "text" as const,
        value: "We do not sell or transfer your personally identifiable information to outside parties except trusted partners assisting us in business operations under confidentiality agreements. Information may be released if required by law, to enforce policies, or protect rights and safety."
      }
    ]
  },
  {
    title: "Third-Party Links",
    content: [
      {
        type: "text" as const,
        value: "Occasionally, we may include third-party products or services. These sites have independent privacy policies; therefore, we hold no responsibility for their content or activities, but strive to maintain integrity and appreciate feedback."
      }
    ]
  },
  {
    title: "Google Services",
    content: [
      {
        type: "text" as const,
        value: "We use Google AdSense and Analytics, which may use cookies for targeted advertising and data reporting. You can manage ad preferences or opt out via Google settings or third-party opt-out tools."
      }
    ]
  },
  {
    title: "Compliance",
    content: [
      {
        type: "text" as const,
        value: "We adhere to relevant privacy laws, including California Online Privacy Protection Act (CalOPPA) and Children's Online Privacy Protection Act (COPPA). Users can visit our site anonymously and will be notified of any privacy changes on our Privacy Policy page."
      }
    ]
  },
  {
    title: "Fair Information Practices",
    content: [
      {
        type: "text" as const,
        value: "In event of a data breach, affected users will be notified within 7 business days by email and on-site notification. We honor the right to individual recourse and compliance with legal processes."
      }
    ]
  },
  {
    title: "CAN-SPAM Act",
    content: [
      {
        type: "text" as const,
        value: "If you subscribe to our emails, you may opt out at any time by contacting us. Unsubscribing stops all future correspondence."
      }
    ]
  },
]
</script>
<template>
  <InformationPage :header="header" :sections="sections" />
</template>