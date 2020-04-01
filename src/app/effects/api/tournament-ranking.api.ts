import Vue from "vue"
import { AxiosRequestConfig } from "axios"
import { classToPlain, plainToClass } from "class-transformer"
import { CreateTournamentRequest } from "@/app/models/CreateTournamentRequest"
import { Tournament } from "@/app/models/Tournament"
import { defaultApiConfig } from "@/config/api.config"
import { Team } from "@/app/models/Team"
import { CreateTeamRequest } from "@/app/models/CreateTeamRequest"
import { Ranking } from "@/app/models/Ranking"

export class TournamentRankingApi {
  private readonly config: AxiosRequestConfig = {}

  constructor(private tournamentId: string) {
    this.config = {
      ...defaultApiConfig,
      url: `tournament/${tournamentId}/ranking`,
    }
  }

  async findAll(): Promise<Ranking[]> {
    const response = await Vue.$http.request({ ...this.config })
    return (response.data as any[]).map((row) => plainToClass(Ranking, row))
  }
}
