<template>
  <section class="tournament">
    <Banner
      :title="title"
      :subtitle="subtitle"
      :state="state"
      :is-loading="loadTournamentIsLoading"
    >
      <template v-slot:body>
        <div
          class="d-flex justify-center"
          v-if="hasTournament"
          style="width: 100%;"
        >
          <v-row v-if="loadTournamentIsLoading">
            <v-col class="d-flex justify-end"
              ><v-skeleton-loader type="button"></v-skeleton-loader
            ></v-col>
            <v-col class="d-flex justify-start"
              ><v-skeleton-loader type="button"></v-skeleton-loader
            ></v-col>
          </v-row>
          <v-row
            v-if="!loadTournamentIsLoading && !showInviationCard && isOpen"
          >
            <v-col class="d-flex justify-end"
              ><v-btn @click="() => (showInviationCard = true)">
                {{ $t('tournament.invitation.title') }}
              </v-btn></v-col
            >
            <v-col class="d-flex justify-start"
              ><v-btn color="primary">Start Tournament</v-btn></v-col
            >
          </v-row>
          <InvitationCard
            v-if="showInviationCard && isOpen"
            :visitor-id="visitorId"
            @close="() => (showInviationCard = false)"
          />
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
import {
  defineComponent,
  computed,
  onBeforeMount,
  ref,
} from '@vue/composition-api'
import { useTournament } from '../reactive/tournament.state'
import Banner from '../components/tournament/Banner.vue'
import NavBar from '../components/tournament/NavBar.vue'
import InvitationCard from '../components/tournament/InvitationCard.vue'

export default defineComponent({
  components: { Banner, NavBar, InvitationCard },
  setup(props, { root }) {
    const {
      isOpen,
      loadTournament,
      tournament,
      loadTournamentIsLoading,
    } = useTournament()

    const showInviationCard = ref(false)
    const copySnackbar = ref(false)

    onBeforeMount(() => loadTournament(root.$route.params.hash))

    const hasTournament = computed(() => !!tournament.name)
    const state = computed(() => tournament.state || '')
    const title = computed(() => tournament.name || root.$t('notFound.title'))
    const visitorId = computed(() => tournament.visitorId || '')
    const subtitle = computed(
      () => tournament.owner || root.$t('notFound.subtitle'),
    )
    const shareUrl = computed(
      () => `${location.origin}/tournament/${tournament.visitorId}`,
    )

    function clipboardSuccessHandler() {
      showInviationCard.value = false
      copySnackbar.value = true
    }

    return {
      title,
      subtitle,
      state,
      visitorId,
      isOpen,
      hasTournament,
      loadTournamentIsLoading,
      showInviationCard,
      shareUrl,
      clipboardSuccessHandler,
      copySnackbar,
    }
  },
})
</script>

<style lang="scss"></style>
