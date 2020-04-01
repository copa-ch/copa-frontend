import { Team } from "@/app/models/Team"

export class Game {
  id!: string
  round!: number
  host!: Team
  guest!: Team
  hostScore!: number
  guestScore!: number

  isPlayed(): boolean {
    return this.hostScore !== null && this.guestScore !== null
  }
}
