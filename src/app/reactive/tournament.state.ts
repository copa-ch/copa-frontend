import Vue from 'vue'
import { TournamentState } from '../dto/tournament-state'
import { API } from '../api'
import { TournamentDto } from '../dto/tournament.dto'
import { ref, computed } from '@vue/composition-api'

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

  const isOpen = computed(() => tournament.state === TournamentState.Open)
  const isPlanable = computed(
    () => tournament.state === TournamentState.Planable,
  )
  const isPlayable = computed(
    () => tournament.state === TournamentState.Playable,
  )
  const isClosed = computed(() => tournament.state === TournamentState.Closed)

  function setTournament(tournamentDto: TournamentDto) {
    log.info(`setTournament`, tournamentDto)
    tournament.id = tournamentDto.id
    tournament.name = tournamentDto.name
    tournament.owner = tournamentDto.owner
    tournament.state = tournamentDto.state
    tournament.visitorId = tournamentDto.visitorId
  }

  function clearTournament() {
    log.info(`clearTournament`)
    tournament.id = ''
    tournament.name = ''
    tournament.owner = ''
    tournament.state = TournamentState.Open
    tournament.visitorId = ''
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
    clearTournament,
    isAdmin,
    loadTournament,
    loadTournamentIsLoading,
    loadTournamentHasFailed,
    isPlayable,
    isPlanable,
    isOpen,
    isClosed,
  }
}
