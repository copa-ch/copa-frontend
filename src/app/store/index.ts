/* ============
 * Vuex Store
 * ============
 *
 * The store of the application.
 *
 * http://vuex.vuejs.org/en/index.html
 */
import Vuex from "vuex"
import createLogger from "vuex/dist/logger"
import {
  TournamentStoreModule,
  TournamentStoreState,
} from "@/app/store/TournamentStore"
import {
  AdminTabStoreModule,
  AdminTabStoreState,
} from "@/app/store/AdminTabStore"
import { FixturesStoreState, FixturesStoreModule } from "./FixturesStore"

/**
 * Define your Store here
 */
export interface Store {
  tournament: TournamentStoreState
  fixtures: FixturesStoreState
  adminTab: AdminTabStoreState
}

const debug = process.env.NODE_ENV !== "production"

export const store = new Vuex.Store<Store>({
  /**
   * Assign the modules to the store.
   */
  modules: {
    adminTab: AdminTabStoreModule,
    tournament: TournamentStoreModule,
    fixtures: FixturesStoreModule,
  },

  /**
   * If strict mode should be enabled.
   */
  strict: debug,

  /**
   * Plugins used in the store.
   */
  plugins: debug ? [createLogger({})] : [],
})
