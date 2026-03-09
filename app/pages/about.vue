<script setup lang="ts">

const header = {
  title: "About OneClick Africa",
  description: [
    "OneClickAfrica is Africa's premier digital hub for impactful news, entertainment, and business insights. Established by a visionary team passionate about telling African stories, our mission is simple: to inform, educate, and connect Africa with the world, one click at a time.",
    "Since its inception, OneClickAfrica has evolved into a daily authority for credible, relevant, and timely information, providing our audience with diverse coverage that spans politics, business, lifestyle, science, entertainment, and beyond. We pride ourselves on blending engaging journalism and accessible reporting, ensuring that every African and global reader finds content that resonates.",
    "We are dedicated to championing free enterprise, democracy, good governance, and economic progress across the continent. Through our relentless pursuit of excellence and innovation, we seek to uplift our readers while promoting knowledge, inclusivity, and positive change. Our editorial teams work tirelessly to maintain the highest standards and integrity in every publication."
  ]
}
const sections = [
  {
    title: "Our Vision",
    content: [
      {
        type: "text" as const,
        value: "To be Africa's leading digital media platform, delivering the widest reach through innovation, reliable service, and curated content that empowers and inspires."
      }
    ]
  },
  {
    title: "Our Mission",
    content: [
      {
        type: "text" as const,
        value: "To impact society positively by providing up-to-date, accurate, insightful, and affordable content, fostering knowledge, engagement, and prosperity for Africans everywhere."
      }
    ]
  },
  {
    title: "What Makes OneClickAfrica Different?",
    content: [
      {
        type: "list" as const,
        value: [
          "Credible and up-to-the-minute news you can trust",
          "Interactive features designed for mobile-first audiences",
          "Engaging opinion, analysis, and features from top contributors",
          "A robust presence in business, entertainment, sports, politics, and science"
        ]
      },
      {
        type: "text" as const,
        value: "As Africa's content frontier, we are committed to driving conversations, celebrating successes, and spotlighting stories that matter."
      },
      {
        type: "text" as const,
        value: "Join our growing community across social platforms, subscribe for regular updates, and discover Africa, redefined, every day at OneClickAfrica."
      }
    ]
  }
]
</script>
<template>
  <InformationPage :header="header" :sections="sections" />
</template>