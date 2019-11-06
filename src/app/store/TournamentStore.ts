import { ActionContext, Module, ActionTree } from 'vuex'
import { Tournament } from '@/app/models/Tournament'
import { RequestState } from '@/app/models/States'
import {
  TournamentStoreActions,
  TournamentStoreGetters,
} from '@/app/store/accessors'
import { Failed, Requested, Successful } from '@/app/store/utils/action.utils'
import { API } from '@/app/api'

// -------------------------------------------------------------------------
// Define Store State
// -------------------------------------------------------------------------

export interface TournamentStoreState {
  error?: any
  tournament?: Tournament
  tournamentState: RequestState
}

type TournamentActionContext = ActionContext<TournamentStoreState,
  TournamentStoreState>

// -------------------------------------------------------------------------
// Define Store Module
// -------------------------------------------------------------------------

export const TournamentStoreModule: Module<TournamentStoreState, any> = {
  // -------------------------------------------------------------------------
  // Define Initial state
  // -------------------------------------------------------------------------
  state: {
    error: undefined,
    tournament: undefined,
    tournamentState: RequestState.PRISTINE,
  },
  // -------------------------------------------------------------------------
  // Define getters
  // -------------------------------------------------------------------------
  getters: {
    [TournamentStoreGetters.Tournament](state: TournamentStoreState) {
      return state.tournament
    },

    [TournamentStoreGetters.VisitorLink](state: TournamentStoreState) {
      if (state && state.tournament) {
        return `${location.origin}/tournament/${state.tournament.visitorId}`
      }
      return ''
    },

    [TournamentStoreGetters.State](state: TournamentStoreState) {
      return state.tournamentState
    },
  },
  // -------------------------------------------------------------------------
  // Define actions
  // -------------------------------------------------------------------------
  actions: {
    async [TournamentStoreActions.Load](
      { commit, state }: TournamentActionContext,
      id: string,
    ): Promise<void> {
      commit(Requested(TournamentStoreActions.Load))
      try {
        const tournament = await API.Tournament.findOne(id)
        commit(Successful(TournamentStoreActions.Load), tournament)
      } catch (error) {
        commit(Failed(TournamentStoreActions.Load), error)
        throw error
      }
    },
  },
  // -------------------------------------------------------------------------
  // Define mutations
  // -------------------------------------------------------------------------
  mutations: {
    [Requested(TournamentStoreActions.Load)](
      state: TournamentStoreState,
    ): void {
      state.tournamentState = RequestState.PENDING
      state.error = undefined
    },

    [Successful(TournamentStoreActions.Load)](
      state: TournamentStoreState,
      tournament: Tournament,
    ): void {
      state.tournamentState = RequestState.SUCCESSFUL
      state.tournament = tournament
    },

    [Failed(TournamentStoreActions.Load)](
      state: TournamentStoreState,
      error: any,
    ): void {
      state.tournamentState = RequestState.FAILED
      state.error = error
    },
  },
}
