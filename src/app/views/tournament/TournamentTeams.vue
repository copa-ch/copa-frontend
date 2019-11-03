<template>
  <section id="teams">
    <section class="container">
      <div class="hero">
        <div class="hero-body">
          <h1 class="title is-4">Teams</h1>
          <h1 class="subtitle is-4">The Tournament is open for team registration.</h1>
        </div>
      </div>
      <TournamentTeamTable :tournament="tournament" />
    </section>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import { TournamentStoreGetters } from '@/app/store/accessors'
import { Tournament } from '@/app/models/Tournament'
import TournamentTeamTable from '@/app/components/TournamentTeamTable.vue'

@Component({
  components: {
    TournamentTeamTable,
  },
})
export default class TournamentTeams extends Vue {
  @Getter(TournamentStoreGetters.Tournament)
  tournament!: Tournament
}
</script>

<style scoped lang="scss">
</style>
