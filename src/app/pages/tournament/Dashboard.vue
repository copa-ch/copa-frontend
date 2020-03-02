<template>
  <section id="tournament">
    <Header />
    <PageHero v-if="!isPending" :title="tournament.name" route-name="tournament" />
    <router-view />
    <Footer />
  </section>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
import { actions, getters } from '@/app/effects/tournament-api.effect'
import Header from '@/app/components/layout/Header.vue'
import PageHero from '@/app/components/layout/PageHero.vue'
import Footer from '@/app/components/layout/Footer.vue'

export default defineComponent({
  components: {
    Header,
    PageHero,
    Footer,
  },
  setup(props, context) {
    actions.loadTournament(context.parent!.$route.params.id);

    return {
      isPending: getters.isPending,
      tournament: getters.tournament,
    }
  },
})
</script>
