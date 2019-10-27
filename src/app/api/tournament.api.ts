import Vue from 'vue'
import { AxiosRequestConfig } from 'axios'
import { classToPlain, plainToClass } from 'class-transformer'
import { CreateTournamentRequest } from '@/app/models/CreateTournamentRequest'
import { Tournament } from '@/app/models/Tournament'
import { defaultApiConfig } from '@/config/api.config'
import { Team } from '@/app/models/Team'
import { TournamentTeamApi } from '@/app/api/tournament-team.api'

export class TournamentApi {

  private readonly config: AxiosRequestConfig = {
    ...defaultApiConfig,
    url: 'tournament',
  }

  public async create(createTournamentRequest: CreateTournamentRequest) {
    const data = classToPlain(createTournamentRequest)
    const response = await Vue.$http.request({
      ...this.config,
      method: 'POST',
      data,
    })
    return plainToClass(Tournament, response.data)
  }

  public async findOne(hashId: string) {
    const response = await Vue.$http.request({
      ...this.config,
      url: `${this.config.url}/${hashId}`,
    })
    return plainToClass(Tournament, response.data)
  }

  public of(tournamentId: string) {
    return {
      Team: new TournamentTeamApi(tournamentId),
    }
  }

}
