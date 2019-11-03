<template>
  <section id="teams-admin" class="container padded-container">
    <h1 class="title">Manage Teams</h1>
    <h1 class="subtitle">Add, update & remove your teams here</h1>
    <TournamentTeamTable :tournament="tournament" style="max-width: 500px" />
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import TournamentTeamTable from '@/app/components/TournamentTeamTable.vue'
import TournamentAdminTabs from '@/app/components/admin/TournamentAdminTabs.vue'
import { Action, Getter } from 'vuex-class'
import {
  TournamentStoreGetters,
  AdminTabStoreActions,
} from '@/app/store/accessors'
import { Tournament } from '@/app/models/Tournament'
import { Events } from '@/app/constants/events'

@Component({
  components: {
    TournamentTeamTable,
    TournamentAdminTabs,
  },
})
export default class TournamentAdminTeams extends Vue {
  @Getter(TournamentStoreGetters.Tournament)
  tournament!: Tournament

  @Action(AdminTabStoreActions.ActivateTab)
  activateTab!: (tabIndex: number) => Promise<void>

  mounted() {
    this.activateTab(0)
  }
}
</script>

<style lang="scss" scoped></style>
