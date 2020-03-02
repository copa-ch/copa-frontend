import Vue from 'vue'
import { computed } from '@vue/composition-api'
import { defaultApiConfig } from '@/config/api.config'
import { plainToClass } from 'class-transformer'
import { Team } from '@/app/models/Team'

interface TeamsStoreState {
  isPending: boolean,
  teams: Team[],
}

const state = Vue.observable<TeamsStoreState>({
  isPending: false,
  teams: [],
})

export const useTournamentTeamsApi = (hashId: string) => {
  const load = async () => {
    state.isPending = true

    const response = await Vue.$http.request({
      ...defaultApiConfig,
      method: 'GET',
      url: `/tournament/${hashId}/team`,
    })

    state.isPending = false
    state.teams = (response.data as any[]).map(row => plainToClass(Team, row))
  }

  const addTeam = async (name: string) => {
    state.isPending = true

    const response = await Vue.$http.request({
      ...defaultApiConfig,
      method: 'POST',
      url: `/tournament/${hashId}/team`,
      data: { name },
    })

    state.isPending = false
    const tournament = plainToClass(Team, response.data)
    state.teams.push(tournament)
  }

  const removeTeam = async (id: string) => {
    state.isPending = true

    await Vue.$http.request({
      ...defaultApiConfig,
      method: 'DELETE',
      url: `/tournament/${hashId}/team/${id}`,
      data: { name },
    })

    state.isPending = false
    state.teams = state.teams.filter((team => team.id !== id))
  };

  return {
    isPending: computed(() => state.isPending),
    teams: computed(() => state.teams),
    load,
    addTeam,
    removeTeam,
  }
}
