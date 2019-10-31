<template>
  <section id="generate-admin" class="container padded-container">
    <h1 class="title">Generate Fixtures</h1>
    <h1 class="subtitle">Define your tournament mode & generate fixtures</h1>

    <b-button type="is-primary"
              :disabled="isPending"
              :loading="isPending"
              @click="generate()">
      Generate Schedule
    </b-button>

    <br>
    <br>

    <section class="round" v-for="(roundGames, index) in rounds" :key="index">
      <h2 class="title is-4">Round {{ index }}</h2>
      <GameRow v-for="game in roundGames" :key="game.id" :game="game"></GameRow>
    </section>

  </section>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import TournamentScheduleConfig from '@/app/components/TournamentScheduleConfig.vue'
  import TournamentAdminTabs from '@/app/components/admin/TournamentAdminTabs.vue'
  import { AdminTabStoreActions } from '@/app/store/types/AdminTabStoreTypes'
  import { Action } from 'vuex-class'
  import { RequestState } from '@/app/models/States'
  import { API } from '@/app/api'
  import { Game } from '@/app/models/Game'
  import GameRow from '@/app/components/GameRow.vue'

  @Component({
    components: {
      GameRow,
      TournamentScheduleConfig,
      TournamentAdminTabs,
    },
  })
  export default class TournamentAdminFixtures extends Vue {

    state: RequestState = RequestState.PRISTINE
    games: Game[] = []
    rounds: Game[][] = []

    @Action(AdminTabStoreActions.ActivateTab)
    activateTab!: (tabIndex: number) => Promise<void>

    get isPending() {
      return this.state === RequestState.PENDING
    }

    mounted() {
      this.activateTab(2)
    }

    async generate() {
      this.state = RequestState.PENDING
      this.games = await API.Tournament.of(this.$route.params.id).Game.generate()
      const initialRounds = this.games
        .map(game => game.round)
        .filter((item, index, arr) => arr.indexOf(item) === index)
        .map(_ => [])
      this.rounds = this.games.reduce<Game[][]>((acc: Game[][], game: Game, index: number) => {
        acc[game.round - 1].push(game)
        return acc
      }, initialRounds)

      this.state = RequestState.SUCCESSFUL
    }

  }
</script>

<style lang="scss">
  @import "../../../styles/variables";
  @import "~bulma/sass/utilities/all";

  .round {
    margin-bottom: 4rem;
  }

</style>
