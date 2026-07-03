<script setup lang="ts">
interface Props {
  id: string
}

const props = defineProps<Props>()
onMounted(() => {
  const _linkedin_partner_id = props.id;

  window._linkedin_data_partner_ids =
    window._linkedin_data_partner_ids || [];

  window._linkedin_data_partner_ids.push(_linkedin_partner_id);

  (function (l) {
    if (!l) {
      s
      window.lintrk = function (a, b) {
        window.lintrk.q.push([a, b]);
      };
      window.lintrk.q = [];
    }

    const s = document.getElementsByTagName("script")[0];
    const b = document.createElement("script");

    b.type = "text/javascript";
    b.async = true;
    b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";

    s.parentNode.insertBefore(b, s);
  })(window.lintrk);
});
</script>

<template>
  <noscript>
    <img height="1" width="1" style="display: none" alt="linked-in"
      :src="`https://px.ads.linkedin.com/collect/?pid=${id}&fmt=gif`" />
  </noscript>
</template>