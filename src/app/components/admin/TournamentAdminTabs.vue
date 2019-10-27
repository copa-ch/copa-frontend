<template>
  <div class="tabs is-medium is-centered">
    <ul>
      <li :class="{ 'is-active': isActive(0) }">
        <router-link :to="{ name: 'admin-teams' }">
          <span class="icon is-small"><font-awesome-icon icon="users"/></span>
          <span>Manage Teams</span>
        </router-link>
      </li>
      <li :class="{ 'is-active': isActive(1) }">
        <router-link :to="{ name: 'admin-config' }">
          <span class="icon is-small"><font-awesome-icon icon="trophy"/></span>
          <span>Update Options</span>
        </router-link>
      </li>
      <li :class="{ 'is-active': isActive(2) }">
        <router-link :to="{ name: 'admin-generate' }">
          <span class="icon is-small"><font-awesome-icon icon="cogs"/></span>
          <span>Generate Fixtures</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component
  export default class TournamentAdminTabs extends Vue {
    @Prop({ default: 0 }) activatedIndex!: number

    isActive(index: number) {
      return parseInt(this.activatedIndex as any, 10) === index
    }
  }
</script>

<style scoped lang="scss">

</style>
