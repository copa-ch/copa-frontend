<template>
  <section id="generate-admin" class="container padded-container">
    <h1 class="title">Generate Fixtures</h1>
    <h1 class="subtitle">Define your tournament mode & generate fixtures</h1>
  </section>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import TournamentScheduleConfig from '@/app/components/TournamentScheduleConfig.vue'
  import TournamentAdminTabs from '@/app/components/admin/TournamentAdminTabs.vue'
  import { Events } from '@/app/constants/events'
  import { AdminTabStoreActions } from '@/app/store/types/AdminTabStoreTypes'
  import { Action } from 'vuex-class'

  @Component({
    components: {
      TournamentScheduleConfig,
      TournamentAdminTabs,
    },
  })
  export default class TournamentAdminGenerate extends Vue {

    @Action(AdminTabStoreActions.ActivateTab)
    activateTab!: (tabIndex: number) => Promise<void>

    mounted() {
      this.activateTab(2)
    }

  }
</script>

<style lang="scss" scoped></style>
