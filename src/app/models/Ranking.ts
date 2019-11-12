import { Team } from '@/app/models/Team'

export class Ranking {
  rank!: number
  team!: Team
  played!: number
  won!: number
  drawn!: number
  lost!: number
  goals!: number
  goalsAgainst!: number
  points!: number
}
