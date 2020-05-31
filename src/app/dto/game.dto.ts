import { Type } from 'class-transformer'
import { TeamDto } from './team.dto'

export class GameDto {
  readonly id!: string
  readonly round!: number

  @Type(() => TeamDto)
  readonly host!: TeamDto

  @Type(() => TeamDto)
  readonly guest!: TeamDto

  readonly hostScore!: number
  readonly guestScore!: number
}
