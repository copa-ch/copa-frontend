import { TournamentState } from './TournamentState'

export class Tournament {
  id!: string
  name!: string
  owner!: string
  adminId!: string
  visitorId!: string
  state!: TournamentState

  isOpen() {
    return this.state === TournamentState.Open
  }

  isPlayable() {
    return this.state === TournamentState.Playable
  }

  isClosed() {
    return this.state === TournamentState.Closed
  }
}
