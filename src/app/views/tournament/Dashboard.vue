<template>
  <section id="tournament">
    <Header />
    <PageHero :title="tournament.name" route-name="tournament" />
    <router-view />
    <Footer />
  </section>
</template>

<script lang="ts">
import { Route } from "vue-router"
import { defineComponent, computed } from "@vue/composition-api"
import Header from "@/app/components/layout/Header.vue"
import PageHero from "@/app/components/layout/PageHero.vue"
import Footer from "@/app/components/layout/Footer.vue"
import {
  getTournament,
  isPending,
  tournament,
} from "@/app/effects/tournament.effect"

export default defineComponent({
  components: {
    Header,
    PageHero,
    Footer,
  },
  beforeRouteEnter: async (to: Route, from: Route, next: () => void) => {
    await getTournament(to.params.id)
    next()
  },
  setup(props, context) {
    return {
      tournament,
    }
  },
})
</script>
