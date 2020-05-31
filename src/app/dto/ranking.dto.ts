import { Type } from 'class-transformer'
import { TeamDto } from './team.dto'

export class RankingDto {
  readonly position!: number

  @Type(() => TeamDto)
  readonly team!: TeamDto

  readonly played!: number
  readonly won!: number
  readonly drawn!: number
  readonly lost!: number
  readonly goals!: number
  readonly goalsAgainst!: number
  readonly points!: number
}
