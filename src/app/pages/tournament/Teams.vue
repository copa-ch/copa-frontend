<template>
  <section id="tournament-teams">
    <div :v-if="!isPending" class="container is-spaced">
      <AddTeam />
      <TeamList :teams="teams" />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { actions, getters } from '@/app/effects/tournament-teams-api.effect'
import AddTeam from '@/app/components/tournament/AddTeam.vue';
import TeamList from '@/app/components/tournament/TeamList.vue';

export default defineComponent({
  components: {
    AddTeam,
    TeamList,
  },
  setup(props, context) {
    actions.loadTournamentTeams(context.parent!.$route.params.id);

    return {
      isPending: getters.isPending,
      teams: getters.teams,
    }
  },
})
</script>

<style>
</style>
