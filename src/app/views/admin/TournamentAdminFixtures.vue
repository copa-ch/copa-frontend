<template>
  <section id="generate-admin" class="container padded-container">
    <h1 class="title">{{ $t('admin.fixtures.title') }}</h1>
    <h1 class="subtitle">{{ $t('admin.fixtures.subtitle') }}</h1>

    <b-button
      type="is-primary"
      :disabled="isPending"
      :loading="isPending"
      @click="generate()"
    >{{ $t('admin.fixtures.generate') }}</b-button>

    <br />
    <br />

    <section class="round" v-for="(roundGames, index) in rounds" :key="index">
      <h2 class="title is-4">Round {{ index }}</h2>
      <GameRow v-for="game in roundGames" :key="game.id" :game="game"></GameRow>
    </section>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import TournamentAdminTabs from '@/app/components/admin/TournamentAdminTabs.vue'
import {
  AdminTabStoreActions,
  FixtruesStoreActions,
  FixtruesStoreGetters,
} from '@/app/store/accessors'
import { Action, Getter } from 'vuex-class'
import { RequestState } from '@/app/models/States'
import { API } from '@/app/api'
import { Game } from '@/app/models/Game'
import GameRow from '@/app/components/GameRow.vue'

@Component({
  components: {
    GameRow,
    TournamentAdminTabs,
  },
})
export default class TournamentAdminFixtures extends Vue {
  @Getter(FixtruesStoreGetters.Rounds)
  rounds!: Game[][]

  @Getter(FixtruesStoreGetters.State)
  state!: RequestState

  @Action(AdminTabStoreActions.ActivateTab)
  activateTab!: (tabIndex: number) => Promise<void>

  @Action(FixtruesStoreActions.Load)
  loadFixtures!: (tournamentHash: string) => Promise<void>

  @Action(FixtruesStoreActions.Generate)
  generateFixtures!: (tournamentHash: string) => Promise<void>

  get isPending() {
    return this.state === RequestState.PENDING
  }

  mounted() {
    this.activateTab(2)
    this.loadFixtures(this.$route.params.id)
  }

  generate() {
    this.generateFixtures(this.$route.params.id)
  }
}
</script>

<style lang="scss">
@import '../../../styles/variables';
@import '~bulma/sass/utilities/all';

.round {
  margin-bottom: 4rem;
}
</style>
