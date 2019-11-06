<template>
  <ul v-if="tournament">
    <li v-if="tournament.isOpen()" :class="{ 'is-active': isTeamActive }">
      <router-link :to="{ name: 'admin-teams' }">
        <span class="icon is-small">
          <font-awesome-icon icon="users"/>
        </span>
        <span>{{ $t('admin.teams.title') }}</span>
      </router-link>
    </li>
    <li :class="{ 'is-active': isFixturesActive }">
      <router-link :to="{ name: 'admin-fixtures' }">
        <span class="icon is-small">
          <font-awesome-icon icon="network-wired"/>
        </span>
        <span>{{ $t('admin.fixtures.title') }}</span>
      </router-link>
    </li>
    <li v-if="!tournament.isOpen()" :class="{ 'is-active': isRankingActive }">
      <router-link :to="{ name: 'admin-ranking' }">
        <span class="icon is-small">
          <font-awesome-icon icon="list-ol"/>
        </span>
        <span>{{ $t('admin.ranking.title') }}</span>
      </router-link>
    </li>
    <li :class="{ 'is-active': isSettingsActive }">
      <router-link :to="{ name: 'admin-settings' }">
        <span class="icon is-small">
          <font-awesome-icon icon="cogs"/>
        </span>
        <span>{{ $t('admin.settings.title') }}</span>
      </router-link>
    </li>
  </ul>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { Events } from '@/app/constants/events'
  import { Getter } from 'vuex-class'
  import {
    AdminTabStoreGetters,
    TournamentStoreGetters,
  } from '@/app/store/accessors'
  import { AdminTabs } from '@/app/constants/tabs'
  import { Tournament } from '@/app/models/Tournament'

  @Component
  export default class TournamentAdminTabs extends Vue {
    @Getter(AdminTabStoreGetters.ActivatedTab)
    activatedTab!: AdminTabs

    @Getter(TournamentStoreGetters.Tournament)
    tournament!: Tournament

    get isTeamActive() {
      return this.isActive(AdminTabs.Teams)
    }

    get isRankingActive() {
      return this.isActive(AdminTabs.Ranking)
    }

    get isFixturesActive() {
      return this.isActive(AdminTabs.Fixtures)
    }

    get isSettingsActive() {
      return this.isActive(AdminTabs.Settings)
    }

    private isActive(adminTabs: AdminTabs) {
      return this.activatedTab === adminTabs
    }
  }
</script>

<style scoped lang="scss">
</style>
