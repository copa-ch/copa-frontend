<template>
  <section id="tournament">

    <NotFoundHero v-if="wasNotFound"/>

    <section v-if="!wasNotFound">
      <TournamentHeading :tournament="tournament">
        <InviteNotification v-if="isInvitationVisible" @close="() => isInvitationVisible = false"/>
        <b-button v-if="!isInvitationVisible" type="is-info" inverted outlined
                  @click="() => isInvitationVisible = true">Invite
        </b-button>
      </TournamentHeading>

      <router-view></router-view>

    </section>

    <b-loading :active.sync="isLoading"></b-loading>
  </section>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator'
  import { Tournament } from '@/app/models/Tournament'
  import { RequestState } from '@/app/models/States'
  import NotFoundHero from '@/app/components/NotFoundHero.vue'
  import InviteNotification from '@/app/components/admin/InviteNotification.vue'
  import TournamentHeading from '@/app/components/TournamentHeading.vue'
  import { Action, Getter } from 'vuex-class'
  import { TournamentStoreActions, TournamentStoreGetters } from '@/app/store/types'

  @Component({
    components: {
      NotFoundHero,
      InviteNotification,
      TournamentHeading,
    },
  })
  export default class TournamentAdminDashboard extends Vue {
    isInvitationVisible = false

    @Getter(TournamentStoreGetters.Tournament)
    tournament!: Tournament

    @Getter(TournamentStoreGetters.TournamentState)
    requestState!: RequestState

    @Action(TournamentStoreActions.LoadTournament)
    loadTournament!: (id: string) => Promise<void>

    get isLoading(): boolean {
      return this.requestState === RequestState.PENDING
    }

    get wasNotFound(): boolean {
      return this.requestState === RequestState.FAILED && !this.tournament
    }

    mounted() {
      this.loadTournament(this.$route.params.id)
    }

    @Watch('tournament')
    verifyAdmin() {
      if (this.tournament && this.tournament.visitorId === this.$route.params.id) {
        this.$router.replace({
          name: 'tournament.teams',
          params: this.$route.params,
        })
      }
    }

  }
</script>

<style lang="scss" scoped></style>
