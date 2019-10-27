<template>
  <section id="generate-admin">
    <TournamentAdminTabs :activated-index="1"/>

    Update Tournament Setting
  </section>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import TournamentAdminTabs from '@/app/components/admin/TournamentAdminTabs.vue'

  @Component({
    components: {
      TournamentAdminTabs,
    },
  })
  export default class TournamentAdminConfig extends Vue {

  }
</script>

<style lang="scss" scoped></style>
