<template>
  <section id="teams-admin">
    <TournamentAdminTabs :activated-index="0"/>

    <section class="container">
      <TournamentTeamTable :tournament="tournament"/>
    </section>
  </section>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import TournamentTeamTable from '@/app/components/TournamentTeamTable.vue'
  import TournamentAdminTabs from '@/app/components/admin/TournamentAdminTabs.vue'
  import { Getter } from 'vuex-class'
  import { TournamentStoreGetters } from '@/app/store/types'
  import { Tournament } from '@/app/models/Tournament'

  @Component({
    components: {
      TournamentTeamTable,
      TournamentAdminTabs,
    },
  })
  export default class TournamentAdminTeams extends Vue {

    @Getter(TournamentStoreGetters.Tournament)
    tournament!: Tournament

  }
</script>

<style lang="scss" scoped></style>
