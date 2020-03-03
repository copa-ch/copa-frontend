import Vue from 'vue'
import { computed } from '@vue/composition-api'
import { API } from '@/app/effects/api'
import { RequestState } from '@/app/models/States'
import { Tournament } from '@/app/models/Tournament'

interface TournamentState {
  requestState: RequestState,
  tournament?: Tournament
}

const state = Vue.observable<TournamentState>({
  requestState: RequestState.PRISTINE,
  tournament: undefined,
})

export const useTournament = () => {
  const isPending = computed(() => state.requestState === RequestState.PENDING)
  const tournament = computed(() => state.tournament)

  const getTournament = async (hashId: string) => {
    try {
      state.requestState = RequestState.PENDING
      state.tournament = await API.Tournament.findOne(hashId)
      state.requestState = RequestState.SUCCESSFUL
    } catch (error) {
      state.requestState = RequestState.FAILED
    }
  }

  return {
    getTournament,
    isPending,
    tournament,
  }
}
