<template>
  <section id="tournament-teams">
    <div :v-if="!isPending" class="container is-spaced">
      <AddTeam />
      <TeamList />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useTeams } from '@/app/effects/teams.effect'
import AddTeam from '@/app/components/tournament/AddTeam.vue';
import TeamList from '@/app/components/tournament/TeamList.vue';

export default defineComponent({
  components: {
    AddTeam,
    TeamList,
  },
  setup(props, context) {
    const { getTeams, addTeam, removeTeam, isPending, teams } = useTeams(context.root.$route.params.id)

    getTeams()

    return {
      isPending,
    }
  },
})
</script>

<style>
</style>
