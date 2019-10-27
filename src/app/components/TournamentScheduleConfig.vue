<template>
  <section>
    <TournamentAdminTabs activated-index="1"/>

    Config
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
  export default class TournamentScheduleConfig extends Vue {


  }
</script>
