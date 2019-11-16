<template>
  <section>
    <table class="table is-fullwidth" style="width: 100%">
      <thead>
      <tr>
        <th class="is-center">
          Position
<!--          <abbr title="Position">Pos</abbr>-->
        </th>
        <th>Team</th>
        <th class="is-center">Played</th>
        <th class="is-center">Won</th>
        <th class="is-center">Drawn</th>
        <th class="is-center">Lost</th>
        <th class="is-center">GF</th>
        <th class="is-center">GA</th>
        <th class="is-center">GD</th>
        <th class="is-center">Points</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(ranking, index) in rankings" :key="index">
        <td class="is-center">{{ ranking.position }}</td>
        <td>{{ ranking.team.name }}</td>
        <td class="is-center">{{ ranking.played }}</td>
        <td class="is-center">{{ ranking.won }}</td>
        <td class="is-center">{{ ranking.drawn }}</td>
        <td class="is-center">{{ ranking.lost }}</td>
        <td class="is-center">{{ ranking.goals}}</td>
        <td class="is-center">{{ ranking.goalsAgainst }}</td>
        <td class="is-center">{{ ranking.goals - ranking.goalsAgainst }}</td>
        <td class="is-center"><strong>{{ ranking.points }}</strong></td>
      </tr>
      </tbody>
    </table>
  </section>
</template>

<script lang="ts">
  import { Component, Mixins } from 'vue-property-decorator'
  import { Ranking } from '@/app/models/Ranking'
  import { RequestState } from '@/app/models/States'
  import { API } from '@/app/api'
  import TournamentMixin from '@/app/mixins/admin/Tournament'

  @Component
  export default class RankingTable extends Mixins(TournamentMixin) {

    rankings: Ranking[] = []
    state: RequestState = RequestState.PRISTINE

    mounted() {
      this.loadRanking()
    }

    async loadRanking() {
      this.state = RequestState.PENDING
      this.rankings = await API.Tournament.of(this.hash).Ranking.findAll()
      this.state = RequestState.SUCCESSFUL
    }

  }
</script>

<style scoped lang="scss">

</style>
