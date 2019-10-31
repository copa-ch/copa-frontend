<template>
  <ul>
    <li :class="{ 'is-active': isActive(0) }">
      <router-link :to="{ name: 'admin-teams' }">
        <span class="icon is-small"><font-awesome-icon icon="users"/></span>
        <span>Teams</span>
      </router-link>
    </li>
    <li :class="{ 'is-active': isActive(2) }">
      <router-link :to="{ name: 'admin-fixtures' }">
        <span class="icon is-small"><font-awesome-icon icon="network-wired"/></span>
        <span>Fixtures</span>
      </router-link>
    </li>
    <li :class="{ 'is-active': isActive(1) }">
      <router-link :to="{ name: 'admin-settings' }">
        <span class="icon is-small"><font-awesome-icon icon="cogs"/></span>
        <span>Settings</span>
      </router-link>
    </li>
  </ul>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { Events } from '@/app/constants/events'
  import { Getter } from 'vuex-class'
  import { AdminTabStoreGetters } from '@/app/store/types/AdminTabStoreTypes'

  @Component
  export default class TournamentAdminTabs extends Vue {

    @Getter(AdminTabStoreGetters.ActivatedTab)
    activatedTab!: number

    isActive(index: number) {
      return parseInt(this.activatedTab as any, 10) === index
    }
  }
</script>

<style scoped lang="scss">

</style>
