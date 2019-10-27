import { ActionContext, Module } from 'vuex'
import { Tournament } from '@/app/models/Tournament'
import { RequestState } from '@/app/models/States'
import { TournamentStoreActions, TournamentStoreGetters } from '@/app/store/types'
import { Failed, Requested, Successful } from '@/app/store/utils/action.utils'
import { API } from '@/app/api'

// -------------------------------------------------------------------------
// Define Store State
// -------------------------------------------------------------------------

export interface TournamentStoreState {
  error?: any;
  tournament?: Tournament;
  getRequestState: RequestState;
}

type TournamentActionContext = ActionContext<TournamentStoreState, TournamentStoreState>

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
    getRequestState: RequestState.PRISTINE,
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
    [TournamentStoreGetters.TournamentState](state: TournamentStoreState) {
      return state.getRequestState
    },
  },
  // -------------------------------------------------------------------------
  // Define actions
  // -------------------------------------------------------------------------
  actions: {
    async [TournamentStoreActions.LoadTournament](
      { commit, state }: TournamentActionContext,
      id: string,
    ): Promise<void> {
      commit(Requested(TournamentStoreActions.LoadTournament))
      try {
        const tournament = await API.Tournament.findOne(id)
        commit(Successful(TournamentStoreActions.LoadTournament), tournament)
      } catch (error) {
        commit(Failed(TournamentStoreActions.LoadTournament), error)
        throw error
      }
    },
  },
  // -------------------------------------------------------------------------
  // Define mutations
  // -------------------------------------------------------------------------
  mutations: {
    [Requested(TournamentStoreActions.LoadTournament)](state: TournamentStoreState): void {
      state.getRequestState = RequestState.PENDING
      state.error = undefined
    },

    [Successful(TournamentStoreActions.LoadTournament)](
      state: TournamentStoreState,
      tournament: Tournament,
    ): void {
      state.getRequestState = RequestState.SUCCESSFUL
      state.tournament = tournament
    },

    [Failed(TournamentStoreActions.LoadTournament)](state: TournamentStoreState, error: any): void {
      state.getRequestState = RequestState.FAILED
      state.error = error
    },
  },
}
