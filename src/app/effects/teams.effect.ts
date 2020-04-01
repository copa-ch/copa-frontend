import Vue from "vue"
import { computed } from "@vue/composition-api"
import { API } from "@/app/effects/api"
import { RequestState } from "@/app/models/States"
import { Team } from "@/app/models/Team"

interface TeamsState {
  requestState: RequestState
  teams: Team[]
}

const state = Vue.observable<TeamsState>({
  requestState: RequestState.PRISTINE,
  teams: [],
})

export const isPending = computed(
  () => state.requestState === RequestState.PENDING,
)
export const teams = computed(() => state.teams)

export const getTeams = async (hashId: string) => {
  try {
    state.requestState = RequestState.PENDING
    state.teams = await API.Tournament.of(hashId).Team.findAll()
    state.requestState = RequestState.SUCCESSFUL
  } catch (error) {
    state.requestState = RequestState.FAILED
  }
}

export const addTeam = async (hashId: string, name: string) => {
  try {
    state.requestState = RequestState.PENDING
    const team = await API.Tournament.of(hashId).Team.addTeam({ name })
    state.teams.push(team)
    state.requestState = RequestState.SUCCESSFUL
  } catch (error) {
    state.requestState = RequestState.FAILED
  }
}

export const removeTeam = async (hashId: string, teamId: string) => {
  try {
    state.requestState = RequestState.PENDING
    await API.Tournament.of(hashId).Team.removeTeam(teamId)
    state.teams = state.teams.filter(({ id }) => id !== teamId)
    state.requestState = RequestState.SUCCESSFUL
  } catch (error) {
    state.requestState = RequestState.FAILED
  }
}
