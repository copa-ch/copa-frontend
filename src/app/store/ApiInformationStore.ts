import { ActionContext, Module } from 'vuex'
import { ApiInformation } from '@/app/models/ApiInformation'
import { RequestState } from '@/app/models/States'
import {
  ApiInformationStoreActions,
  ApiInformationStoreGetters,
} from '@/app/store/accessors'
import { Failed, Requested, Successful } from '@/app/store/utils/action.utils'
import { API } from '@/app/effects/api'

// -------------------------------------------------------------------------
// Define Store State
// -------------------------------------------------------------------------

export interface ApiInformationStoreState {
  error?: any
  apiInformation?: ApiInformation
  apiInformationState: RequestState
}

type ApiInformationActionContext = ActionContext<ApiInformationStoreState,
  ApiInformationStoreState>

// -------------------------------------------------------------------------
// Define Store Module
// -------------------------------------------------------------------------

export const ApiInformationStoreModule: Module<ApiInformationStoreState, any> = {
  // -------------------------------------------------------------------------
  // Define Initial state
  // -------------------------------------------------------------------------

  state: {
    error: undefined,
    apiInformation: undefined,
    apiInformationState: RequestState.PRISTINE,
  },

  // -------------------------------------------------------------------------
  // Define getters
  // -------------------------------------------------------------------------

  getters: {
    [ApiInformationStoreGetters.ApiInformation](state: ApiInformationStoreState) {
      return state.apiInformation;
    },
    [ApiInformationStoreGetters.ApiInformationState](state: ApiInformationStoreState) {
      return state.apiInformationState;
    },
  },

  // -------------------------------------------------------------------------
  // Define actions
  // -------------------------------------------------------------------------

  actions: {
    async [ApiInformationStoreActions.Load](
      { commit }: ApiInformationActionContext,
    ): Promise<void> {
      commit(Requested(ApiInformationStoreActions.Load))
      try {
        const apiInformation = await API.getInfo()
        commit(Successful(ApiInformationStoreActions.Load), apiInformation)
      } catch (error) {
        commit(Failed(ApiInformationStoreActions.Load), error)
        throw error
      }
    },
  },

  // -------------------------------------------------------------------------
  // Define mutations
  // -------------------------------------------------------------------------

  mutations: {
    [Requested(ApiInformationStoreActions.Load)](
      state: ApiInformationStoreState,
    ): void {
      state.apiInformationState = RequestState.PENDING
      state.error = undefined
    },

    [Successful(ApiInformationStoreActions.Load)](
      state: ApiInformationStoreState,
      apiInformation: ApiInformation,
    ): void {
      state.apiInformationState = RequestState.SUCCESSFUL
      state.apiInformation = apiInformation
    },

    [Failed(ApiInformationStoreActions.Load)](
      state: ApiInformationStoreState,
      error: any,
    ): void {
      state.apiInformationState = RequestState.FAILED
      state.error = error
    },
  },
}
