import { Team } from '@/app/models/Team'

export class Game {
  public id!: string
  public round!: number
  public host!: Team
  public guest!: Team
}
