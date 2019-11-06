import { ActionContext, Module } from 'vuex'
import { Successful } from '@/app/store/utils/action.utils'
import { AdminTabStoreGetters, AdminTabStoreActions } from './accessors'
import { AdminTabs } from '../constants/tabs'

// -------------------------------------------------------------------------
// Define Store State
// -------------------------------------------------------------------------

export interface AdminTabStoreState {
  activatedTab: AdminTabs
}

type AdminTabActionContext = ActionContext<AdminTabStoreState,
  AdminTabStoreState>

// -------------------------------------------------------------------------
// Define Store Module
// -------------------------------------------------------------------------

export const AdminTabStoreModule: Module<AdminTabStoreState, any> = {
  // -------------------------------------------------------------------------
  // Define Initial state
  // -------------------------------------------------------------------------
  state: {
    activatedTab: AdminTabs.None,
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
  // Define actionss
  // -------------------------------------------------------------------------
  actions: {
    async [AdminTabStoreActions.ActivateTab](
      { commit, state }: AdminTabActionContext,
      activatedTab: AdminTabs,
    ): Promise<void> {
      commit(Successful(AdminTabStoreActions.ActivateTab), activatedTab)
    },
  },
  // -------------------------------------------------------------------------
  // Define mutations
  // -------------------------------------------------------------------------
  mutations: {
    [Successful(AdminTabStoreActions.ActivateTab)](
      state: AdminTabStoreState,
      activatedTab: AdminTabs,
    ): void {
      state.activatedTab = activatedTab
    },
  },
}
