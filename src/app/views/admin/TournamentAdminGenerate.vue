<template>
  <section id="generate-admin">
    <TournamentAdminTabs :activated-index="2"/>

    Config
  </section>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import TournamentScheduleConfig from '@/app/components/TournamentScheduleConfig.vue'
  import TournamentAdminTabs from '@/app/components/admin/TournamentAdminTabs.vue'

  @Component({
    components: {
      TournamentScheduleConfig,
      TournamentAdminTabs,
    },
  })
  export default class TournamentAdminGenerate extends Vue {

  }
</script>

<style lang="scss" scoped></style>
