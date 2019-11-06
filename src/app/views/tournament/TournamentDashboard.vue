<template>
  <section id="tournament">
    <NotFoundHero v-if="wasNotFound"/>

    <section v-if="!wasNotFound">
      <TournamentHeading :tournament="tournament"/>

      <router-view></router-view>
    </section>

    <b-loading :active.sync="isLoading"></b-loading>
  </section>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator'
  import { Action, Getter } from 'vuex-class'
  import {
    TournamentStoreActions,
    TournamentStoreGetters,
  } from '@/app/store/accessors'
  import { RequestState } from '@/app/models/States'
  import { Tournament } from '@/app/models/Tournament'
  import NotFoundHero from '@/app/components/NotFoundHero.vue'
  import TournamentHeading from '@/app/components/TournamentHeading.vue'

  @Component({
    components: {
      NotFoundHero,
      TournamentHeading,
    },
  })
  export default class TournamentDashboard extends Vue {
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
  }
</script>

<style scoped lang="scss">
</style>
