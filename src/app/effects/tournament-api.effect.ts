import Vue from 'vue'
import { computed } from '@vue/composition-api'
import { plainToClass } from 'class-transformer'
import { defaultApiConfig } from '@/config/api.config'
import { Tournament } from '@/app/models/Tournament'

interface TournamentStoreState {
  isPending: boolean,
  tournament?: Tournament,
}

const state = Vue.observable<TournamentStoreState>({
  isPending: false,
  tournament: undefined,
})

export const useTournamentApi = () => {
  const load = async (hashId: string) => {
    state.isPending = true

    const response = await Vue.$http.request({
      ...defaultApiConfig,
      url: `/tournament/${hashId}`,
    })

    state.isPending = false
    state.tournament = plainToClass(Tournament, response.data)
  }

  return {
    isPending: computed(() => state.isPending),
    tournament: computed(() => state.tournament),
    load,
  }
};
