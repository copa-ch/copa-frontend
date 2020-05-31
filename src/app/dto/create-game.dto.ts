import { Type } from 'class-transformer'
import { TeamDto } from './team.dto'

export class CreateGameDto {
  readonly round!: number

  @Type(() => TeamDto)
  readonly host!: TeamDto

  @Type(() => TeamDto)
  readonly guest!: TeamDto
}
