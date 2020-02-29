<template>
  <section id="tournament">
    <Header />
    <PageHero route-name="tournament" />
    <router-view />
    <Footer />
  </section>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import Header from '@/app/components/layout/Header.vue'
import PageHero from '@/app/components/layout/PageHero.vue'
import Footer from '@/app/components/layout/Footer.vue'

export default defineComponent({
  components: {
    Header,
    PageHero,
    Footer,
  },
  setup() {
  },
})
</script>
