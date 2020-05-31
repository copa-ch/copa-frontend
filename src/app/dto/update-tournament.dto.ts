import { TournamentState } from './tournament-state'

export class UpdateTournamentDto {
  readonly name?: string
  readonly owner?: string
  readonly state?: TournamentState
}
