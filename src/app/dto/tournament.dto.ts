import { TournamentState } from './tournament-state'

export class TournamentDto {
  id!: string
  name!: string
  owner!: string
  state!: TournamentState
  visitorId!: string
}
