<template>
  <section id="tournament-team-list">
    <table class="table is-fullwidth is-hoverable">
      <tbody>
        <TeamItem
          v-for="team in teams"
          :key="team.id"
          :team="team"
        />
      </tbody>
    </table>
  </section>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import TeamItem from '@/app/components/tournament/TeamItem.vue'
import { useTeams } from '@/app/effects/teams.effect'

export default defineComponent({
  components: {
    TeamItem,
  },
  setup(props, context) {
    const { teams } = useTeams(context.root.$route.params.id)

    return {
      teams,
    }
  },
})
</script>

<style lang="scss" scoped>
@import '../../../styles/variables.scss';

section {
  padding-top: $spacing-4;
  padding-bottom: $spacing-8;
}
</style>
