<template>
  <section>
    <table class="table is-fullwidth is-bordered is-striped is-hoverable" style="width: 100%">
      <thead>
      <tr>
        <th class="is-center" width="80px"><abbr title="Position">Pos</abbr></th>
        <th>Team Name</th>
      </tr>
      </thead>
      <tbody>
      <tr class="has-background-grey-lighter">
        <th colspan="2" style="vertical-align: center">
          <TournamentAdminAddTeamControl :tournament="tournament" @addTeam="loadTeams()" />
        </th>
      </tr>
      <tr class="row" v-for="(team, index) in teams" :key="team.id">
        <th class="is-center row-header">
          <span>{{ index + 1 }}</span>
          <a class="delete" @click="deleteTeam(team)"></a>
        </th>
        <td style="vertical-align: center">
          {{ team.name }}
        </td>
      </tr>
      <tr v-if="teams.length === 0">
        <th colspan="2" class="is-center">
          <div class="hero">
            <div class="hero-body">
              <h1 class="title is-4">No Teams</h1>
              <h1 class="subtitle is-6">Create some teams to fill your tournament</h1>
            </div>
          </div>
        </th>
      </tr>
      </tbody>
    </table>
  </section>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
  import { Tournament } from '@/app/models/Tournament'
  import { RequestState } from '@/app/models/States'
  import { API } from '@/app/api'
  import { Team } from '@/app/models/Team'
  import TournamentAdminAddTeamControl from '@/app/components/forms/TournamentAdminAddTeamControl.vue'

  @Component({
    components: {
      TournamentAdminAddTeamControl,
    },
  })
  export default class TournamentTeamTable extends Vue {

    @Prop({ required: true })
    tournament!: Tournament

    teams: Team[] = []
    loadTeamState: RequestState = RequestState.PRISTINE

    mounted() {
      if (this.tournament) {
        this.loadTeams()
      }
    }

    @Watch('tournament')
    async loadTeams() {
      this.loadTeamState = RequestState.PENDING
      this.teams = await API.Tournament.of(this.tournament.visitorId).Team.findAll()
      this.loadTeamState = RequestState.SUCCESSFUL
    }

    async deleteTeam(team: Team) {
      await API.Tournament.of(this.tournament.visitorId).Team.removeTeam(team.id)
      this.loadTeams()
    }

  }
</script>

<style lang="scss" scoped>
  .row {
    .row-header a {
      display: none;
    }

    &:hover .row-header {
      a {
        display: inline-block;
      }

      span {
        display: none;
      }
    }
  }
</style>
