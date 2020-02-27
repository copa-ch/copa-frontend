/* ============
 * Vuex Store
 * ============
 *
 * The store of the application.
 *
 * http://vuex.vuejs.org/en/index.html
 */
import Vuex from 'vuex'
import {
  TournamentStoreModule,
  TournamentStoreState,
} from '@/app/store/TournamentStore'
import {
  FixturesStoreModule,
  FixturesStoreState,
} from '@/app/store/FixturesStore'
import {
  ApiInformationStoreModule,
  ApiInformationStoreState,
} from '@/app/store/ApiInformationStore'

/**
 * Define your Store here
 */
export interface Store {
  tournament: TournamentStoreState
  fixtures: FixturesStoreState
  apiInformation: ApiInformationStoreState
}

const debug = process.env.NODE_ENV !== 'production'

export const store = new Vuex.Store<Store>({
  /**
   * Assign the modules to the store.
   */
  modules: {
    tournament: TournamentStoreModule,
    fixtures: FixturesStoreModule,
    apiInformation: ApiInformationStoreModule,
  },

  /**
   * If strict mode should be enabled.
   */
  strict: debug,

})
