<template>
  <section id="tournament-teams">
    <div class="container is-spaced">
      <AddTeam />
      <TeamList />
    </div>
  </section>
</template>

<script lang="ts">
import { Route } from 'vue-router';
import { defineComponent, onBeforeMount } from '@vue/composition-api'
import { getTeams } from '@/app/effects/teams.effect'
import AddTeam from '@/app/components/tournament/AddTeam.vue';
import TeamList from '@/app/components/tournament/TeamList.vue';

export default defineComponent({
  components: {
    AddTeam,
    TeamList,
  },
  beforeRouteEnter: async (to: Route, from: Route, next: () => void) => {
    await getTeams(to.params.id)
    next()
  },
})
</script>

<style>
</style>
