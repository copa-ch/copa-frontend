<template>
  <section>
    <AddTeam
      v-if="isOpen"
      @input="newTeam => addNewTeam(newTeam)"
      :is-loading="isLoading"
      style="margin-button: 30px;"
    />
    <TeamList
      :teams="teams"
      @removed="teamIndex => removed(teamIndex)"
      :is-loading="isLoading"
    />
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount } from '@vue/composition-api'
import AddTeam from './AddTeam.vue'
import TeamList from './TeamList.vue'
import { TeamDto } from '../../dto/team.dto'
import { API } from '../../api'
import { useTournament } from '../../reactive/tournament.state'

export default defineComponent({
  components: { AddTeam, TeamList },
  setup(props, { root }) {
    const { isOpen } = useTournament()
    const isLoading = ref(false)
    const teams = ref<TeamDto[]>([])

    function addNewTeam(newTeam: TeamDto) {
      teams.value.push(newTeam)
    }

    async function loadTeams() {
      isLoading.value = true
      const response = await API.Tournament.findAllTeams(
        root.$route.params.hash,
      )
      if (response.isSuccessful && response.data) {
        teams.value = response.data
      }
      isLoading.value = false
    }

    function removed(teamIndex: number) {
      const list = teams.value
      list.splice(teamIndex, 1)
      teams.value = [...list]
    }

    onBeforeMount(() => loadTeams())

    return {
      teams,
      removed,
      addNewTeam,
      isLoading,
      isOpen,
    }
  },
})
</script>

<style lang="scss"></style>
