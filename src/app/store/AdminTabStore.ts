import { ActionContext, Module } from 'vuex'
import { AdminTabStoreActions, AdminTabStoreGetters } from '@/app/store/types/AdminTabStoreTypes'
import { TournamentStoreActions } from '@/app/store/types'
import { Failed, Requested, Successful } from '@/app/store/utils/action.utils'
import { API } from '@/app/api'
import { RequestState } from '@/app/models/States'
import { TournamentStoreState } from '@/app/store/TournamentStore'

// -------------------------------------------------------------------------
// Define Store State
// -------------------------------------------------------------------------

export interface AdminTabStoreState {
  activatedTab: number
}

type AdminTabActionContext = ActionContext<AdminTabStoreState, AdminTabStoreState>

// -------------------------------------------------------------------------
// Define Store Module
// -------------------------------------------------------------------------

export const AdminTabStoreModule: Module<AdminTabStoreState, any> = {
  // -------------------------------------------------------------------------
  // Define Initial state
  // -------------------------------------------------------------------------
  state: {
    activatedTab: -1,
  },
  // -------------------------------------------------------------------------
  // Define getters
  // -------------------------------------------------------------------------
  getters: {
    [AdminTabStoreGetters.ActivatedTab](state: AdminTabStoreState) {
      return state.activatedTab
    },
  },
  // -------------------------------------------------------------------------
  // Define actions
  // -------------------------------------------------------------------------
  actions: {
    async [AdminTabStoreActions.ActivateTab](
      { commit, state }: AdminTabActionContext,
      activatedTab: number,
    ): Promise<void> {
      commit(Successful(AdminTabStoreActions.ActivateTab), activatedTab)
    },
  },
  // -------------------------------------------------------------------------
  // Define mutations
  // -------------------------------------------------------------------------
  mutations: {
    [Successful(AdminTabStoreActions.ActivateTab)](state: AdminTabStoreState, activatedTab: number): void {
      state.activatedTab = activatedTab
    },
  },
}
