import Vue from 'vue'
import { computed } from '@vue/composition-api'
import { plainToClass } from 'class-transformer'
import { defaultApiConfig } from '@/config/api.config'
import { RequestState } from '@/app/models/States'
import { Tournament } from '@/app/models/Tournament'

interface TournamentStoreState {
  tournamentApiState: RequestState,
  tournament?: Tournament,
}

const state = Vue.observable<TournamentStoreState>({
  tournamentApiState: RequestState.PRISTINE,
  tournament: undefined,
})

export const getters = {
  isPending: computed(() => state.tournamentApiState === RequestState.PENDING),
  tournament: computed(() => state.tournament),
}

const mutations = {
  setTournamentApiState: (apiState: RequestState) => state.tournamentApiState = apiState,
  setTournament: (tournament: Object) => state.tournament = plainToClass(Tournament, tournament),
};

export const actions = {
  loadTournament: async (hashId: string) => {
    mutations.setTournamentApiState(RequestState.PENDING)

    try {
      const response = await Vue.$http.request({
        ...defaultApiConfig,
        url: `/tournament/${hashId}`,
      })

      mutations.setTournamentApiState(RequestState.SUCCESSFUL)
      mutations.setTournament(response.data)
    } catch (error) {
      mutations.setTournamentApiState(RequestState.FAILED)
    }
  },
}
