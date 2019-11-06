<template>
  <section id="teams-admin" class="container padded-container">
    <h1 class="title">{{ $t('admin.ranking.title') }}</h1>
    <h1 class="subtitle">{{ $t('admin.ranking.subtitle') }}</h1>
  </section>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import TournamentAdminTabs from '@/app/components/admin/TournamentAdminTabs.vue'
  import { Action, Getter } from 'vuex-class'
  import {
    TournamentStoreGetters,
    AdminTabStoreActions,
  } from '@/app/store/accessors'
  import { Tournament } from '@/app/models/Tournament'
  import { Events } from '@/app/constants/events'
  import { AdminTabs } from '@/app/constants/tabs'

  @Component({
    components: {
      TournamentAdminTabs,
    },
  })
  export default class TournamentAdminRanking extends Vue {
    @Getter(TournamentStoreGetters.Tournament)
    tournament!: Tournament

    @Action(AdminTabStoreActions.ActivateTab)
    activateTab!: (tab: AdminTabs) => Promise<void>

    mounted() {
      this.activateTab(AdminTabs.Ranking)
    }
  }
</script>

<style lang="scss" scoped></style>
