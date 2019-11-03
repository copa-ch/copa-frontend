import { ActionContext, Module } from 'vuex'
import { Tournament } from '@/app/models/Tournament'
import { RequestState } from '@/app/models/States'
import {
  FixtruesStoreActions,
  FixtruesStoreGetters,
} from '@/app/store/accessors'
import { Failed, Requested, Successful } from '@/app/store/utils/action.utils'
import { API } from '@/app/api'
import { Game } from '../models/Game'

// -------------------------------------------------------------------------
// Define Store State
// -------------------------------------------------------------------------

export interface FixturesStoreState {
  error?: any
  fixtures: Game[]
  state: RequestState
}

type FixturesActionContext = ActionContext<
  FixturesStoreState,
  FixturesStoreState
>

// -------------------------------------------------------------------------
// Define Store Module
// -------------------------------------------------------------------------

export const FixturesStoreModule: Module<FixturesStoreState, any> = {
  // -------------------------------------------------------------------------
  // Define Initial state
  // -------------------------------------------------------------------------
  state: {
    error: undefined,
    fixtures: [],
    state: RequestState.PRISTINE,
  },
  // -------------------------------------------------------------------------
  // Define getters
  // -------------------------------------------------------------------------
  getters: {
    [FixtruesStoreGetters.Fixtrues](state: FixturesStoreState): Game[] {
      return state.fixtures
    },

    [FixtruesStoreGetters.State](state: FixturesStoreState): RequestState {
      return state.state
    },

    [FixtruesStoreGetters.Rounds](state: FixturesStoreState): Game[][] {
      const initialRounds = (state.fixtures as Game[])
        .map(game => game.round)
        .filter((item, index, arr) => arr.indexOf(item) === index)
        .map(_ => [])

      return (state.fixtures as Game[]).reduce<Game[][]>(
        (acc: Game[][], game: Game, index: number) => {
          acc[game.round - 1].push(game)
          return acc
        },
        initialRounds,
      )
    },
  },
  // -------------------------------------------------------------------------
  // Define actions
  // -------------------------------------------------------------------------
  actions: {
    async [FixtruesStoreActions.Load](
      { commit, state }: FixturesActionContext,
      tournamentHash: string,
    ): Promise<void> {
      commit(Requested(FixtruesStoreActions.Load))
      try {
        const games = await API.Tournament.of(tournamentHash).Game.findAll()
        commit(Successful(FixtruesStoreActions.Load), games)
      } catch (error) {
        commit(Failed(FixtruesStoreActions.Load), error)
      }
    },

    async [FixtruesStoreActions.Generate](
      { commit, state }: FixturesActionContext,
      tournamentHash: string,
    ): Promise<void> {
      commit(Requested(FixtruesStoreActions.Generate))
      try {
        const games = await API.Tournament.of(tournamentHash).Game.generate()
        commit(Successful(FixtruesStoreActions.Load), games)
      } catch (error) {
        commit(Failed(FixtruesStoreActions.Generate), error)
      }
    },
  },
  // -------------------------------------------------------------------------
  // Define mutations
  // -------------------------------------------------------------------------
  mutations: {
    [Requested(FixtruesStoreActions.Load)](state: FixturesStoreState): void {
      state.state = RequestState.PENDING
      state.error = undefined
    },

    [Successful(FixtruesStoreActions.Load)](
      state: FixturesStoreState,
      fixtures: Game[],
    ): void {
      state.state = RequestState.SUCCESSFUL
      state.fixtures = fixtures
    },

    [Failed(FixtruesStoreActions.Load)](
      state: FixturesStoreState,
      error: any,
    ): void {
      state.state = RequestState.FAILED
      state.error = error
    },

    [Requested(FixtruesStoreActions.Generate)](
      state: FixturesStoreState,
    ): void {
      state.state = RequestState.PENDING
      state.error = undefined
    },

    [Successful(FixtruesStoreActions.Generate)](
      state: FixturesStoreState,
      fixtures: Game[],
    ): void {
      state.state = RequestState.SUCCESSFUL
      state.fixtures = fixtures
    },

    [Failed(FixtruesStoreActions.Generate)](
      state: FixturesStoreState,
      error: any,
    ): void {
      state.state = RequestState.FAILED
      state.error = error
    },
  },
}
