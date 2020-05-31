import Vue from 'vue'
import { TournamentState } from '../dto/tournament-state'
import { API } from '../api'
import { TournamentDto } from '../dto/tournament.dto'
import { ref } from '@vue/composition-api'

const tournament = Vue.observable<TournamentDto>({
  id: '',
  name: '',
  owner: '',
  state: TournamentState.Open,
  visitorId: '',
})

const log = Vue.$createLogger('tournament.state')

export function useTournament() {
  const loadTournamentHasFailed = ref(false)
  const loadTournamentIsLoading = ref(false)

  function setTournament(tournamentDto: TournamentDto) {
    log.info(`setTournament`, tournamentDto)
    tournament.id = tournamentDto.id
    tournament.name = tournamentDto.name
    tournament.owner = tournamentDto.owner
    tournament.state = tournamentDto.state
    tournament.visitorId = tournamentDto.visitorId
  }

  async function loadTournament(id: string) {
    loadTournamentHasFailed.value = false
    loadTournamentIsLoading.value = true
    const response = await API.Tournament.findOne(id)
    loadTournamentIsLoading.value = false
    if (response.isSuccessful && response.data) {
      setTournament(response.data as any)
    } else {
      loadTournamentHasFailed.value = true
    }
  }

  function isAdmin(hash: string) {
    return tournament.visitorId !== hash
  }

  return {
    tournament,
    setTournament,
    isAdmin,
    loadTournament,
    loadTournamentIsLoading,
    loadTournamentHasFailed,
  }
}
