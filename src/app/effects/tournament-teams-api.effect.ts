import Vue from 'vue'
import { computed } from '@vue/composition-api'
import { defaultApiConfig } from '@/config/api.config'
import { plainToClass } from 'class-transformer'
import { RequestState } from '@/app/models/States'
import { Team } from '@/app/models/Team'

interface TeamsStoreState {
  tournamentTeamsApiState: RequestState,
  teams: Team[],
}

const state = Vue.observable<TeamsStoreState>({
  tournamentTeamsApiState: RequestState.PRISTINE,
  teams: [],
})

export const getters = {
  isPending: computed(() => state.tournamentTeamsApiState === RequestState.PENDING),
  teams: computed(() => state.teams),
}

const mutations = {
  setTournamentTeamsApiState: (apiState: RequestState) => state.tournamentTeamsApiState = apiState,
  setTournamentTeams: (teams: {}[]) => state.teams = teams.map(row => plainToClass(Team, row)),
  setTournamentTeam: (team: {}) => state.teams.push(plainToClass(Team, team)),
  removeTournamentTeam: (teamId: string) => state.teams = state.teams.filter(team => team.id !== teamId),
}

export const actions = {
  loadTournamentTeams: async (hashId: string) => {
    mutations.setTournamentTeamsApiState(RequestState.PENDING)

    try {
      const response = await Vue.$http.request({
        ...defaultApiConfig,
        method: 'GET',
        url: `/tournament/${hashId}/team`,
      })

      mutations.setTournamentTeamsApiState(RequestState.SUCCESSFUL)
      mutations.setTournamentTeams(response.data)
    } catch (error) {
      mutations.setTournamentTeamsApiState(RequestState.FAILED)
    }
  },
  addTournamentTeam: async (hashId: string, name: string) => {
    mutations.setTournamentTeamsApiState(RequestState.PENDING)

    try {
      const response = await Vue.$http.request({
        ...defaultApiConfig,
        method: 'POST',
        url: `/tournament/${hashId}/team`,
        data: { name },
      })

      mutations.setTournamentTeamsApiState(RequestState.SUCCESSFUL)
      mutations.setTournamentTeam(response.data)
    } catch (error) {
      mutations.setTournamentTeamsApiState(RequestState.FAILED)
    }
  },
  removeTournamentTeam: async (hashId: string, teamId: string) => {
    mutations.setTournamentTeamsApiState(RequestState.PENDING)

    try {
      await Vue.$http.request({
        ...defaultApiConfig,
        method: 'DELETE',
        url: `/tournament/${hashId}/team/${teamId}`,
        data: { name },
      })

      mutations.setTournamentTeamsApiState(RequestState.SUCCESSFUL)
      mutations.removeTournamentTeam(teamId)
    } catch (error) {
      mutations.setTournamentTeamsApiState(RequestState.FAILED)
    }
  },
}
