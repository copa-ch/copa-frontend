<template>
  <section class="tournament">
    <Banner
      :title="title"
      :subtitle="subtitle"
      :is-loading="loadTournamentIsLoading"
    >
      <template v-slot:body>
        <div v-if="hasTournament">
          TODO: Invitaion & go to next phase
        </div>
      </template>

      <template v-slot:footer>
        <NavBar v-if="hasTournament" />
      </template>
    </Banner>
    <router-view v-if="hasTournament" />
  </section>
</template>

<script lang="ts">
import { defineComponent, computed, onBeforeMount } from '@vue/composition-api'
import { useTournament } from '../reactive/tournament.state'
import Banner from '../components/tournament/Banner.vue'
import NavBar from '../components/tournament/NavBar.vue'

export default defineComponent({
  components: { Banner, NavBar },
  setup(props, { root }) {
    const {
      loadTournament,
      tournament,
      loadTournamentIsLoading,
    } = useTournament()

    onBeforeMount(() => loadTournament(root.$route.params.hash))

    const hasTournament = computed(() => !!tournament.name)
    const title = computed(() => tournament.name || root.$t('notFound.title'))
    const subtitle = computed(
      () => tournament.owner || root.$t('notFound.subtitle'),
    )

    return { title, subtitle, hasTournament, loadTournamentIsLoading }
  },
})
</script>

<style lang="scss"></style>
