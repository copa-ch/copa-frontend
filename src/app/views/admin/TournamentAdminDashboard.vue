<template>
  <section id="tournament" class="is-full-height">
    <NotFoundHero v-if="wasNotFound"/>

    <section v-if="!wasNotFound" class="content">
      <TournamentHeading :tournament="tournament">
        <section v-if="tournament && tournament.isOpen()">
          <InviteNotification
            v-if="isInvitationVisible"
            @close="() => isInvitationVisible = false"
          />
          <StartNotification v-if="isStartingVisible" @close="() => isStartingVisible = false"/>
          <div class="buttons is-flex is-centered">
            <b-button
              v-if="!isInvitationVisible && !isStartingVisible"
              type="is-info"
              inverted
              @click="() => isInvitationVisible = true"
            >{{ $t('admin.invite.action') }}
            </b-button>
            <b-button
              v-if="!isInvitationVisible && !isStartingVisible"
              type="is-primary"
              @click="() => isStartingVisible = true"
            >{{ $t('admin.start.action') }}
            </b-button>
          </div>
        </section>
      </TournamentHeading>

      <router-view></router-view>
    </section>

    <b-loading :active.sync="isLoading"></b-loading>

    <Footer />
  </section>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator'
  import { Tournament } from '@/app/models/Tournament'
  import { RequestState } from '@/app/models/States'
  import NotFoundHero from '@/app/components/NotFoundHero.vue'
  import InviteNotification from '@/app/components/admin/InviteNotification.vue'
  import StartNotification from '@/app/components/admin/StartNotification.vue'
  import TournamentHeading from '@/app/components/TournamentHeading.vue'
  import Footer from '@/app/components/layout/Footer.vue'
  import { Action, Getter } from 'vuex-class'
  import {
    TournamentStoreActions,
    TournamentStoreGetters,
  } from '@/app/store/accessors'

  @Component({
    components: {
      NotFoundHero,
      InviteNotification,
      StartNotification,
      TournamentHeading,
      Footer,
    },
  })
  export default class TournamentAdminDashboard extends Vue {
    isInvitationVisible = false
    isStartingVisible = false

    @Getter(TournamentStoreGetters.Tournament)
    tournament!: Tournament

    @Getter(TournamentStoreGetters.State)
    requestState!: RequestState

    @Action(TournamentStoreActions.Load)
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
      if (
        this.tournament &&
        this.tournament.visitorId === this.$route.params.id
      ) {
        this.$router.replace({
          name: 'tournament.teams',
          params: this.$route.params,
        })
      }
    }
  }
</script>

<style lang="scss" scoped></style>
