<template>
  <section>
    <AddTeam @input="newTeam => addNewTeam(newTeam)" :is-loading="isLoading" />
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

export default defineComponent({
  components: { AddTeam, TeamList },
  setup(props, { root }) {
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
    }
  },
})
</script>

<style lang="scss"></style>
