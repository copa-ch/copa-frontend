import Vue from 'vue'
import { AxiosRequestConfig } from 'axios'
import { classToPlain, plainToClass } from 'class-transformer'
import { CreateTournamentRequest } from '@/app/models/CreateTournamentRequest'
import { Tournament } from '@/app/models/Tournament'
import { defaultApiConfig } from '@/config/api.config'
import { TournamentTeamApi } from '@/app/effects/api/tournament-team.api'
import { UpdateTournamentRequest } from '@/app/models/UpdateTournamentRequest'
import { TournamentGameApi } from '@/app/effects/api/tournament-game.api'
import { TournamentRankingApi } from '@/app/effects/api/tournament-ranking.api'

export class TournamentApi {

  private readonly config: AxiosRequestConfig = {
    ...defaultApiConfig,
    url: 'tournament',
  }

  public of(tournamentId: string) {
    return {
      Team: new TournamentTeamApi(tournamentId),
      Game: new TournamentGameApi(tournamentId),
      Ranking: new TournamentRankingApi(tournamentId),
    }
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

  public async update(hashId: string, updateTournamentRequest: UpdateTournamentRequest) {
    const data = classToPlain(updateTournamentRequest)
    const response = await Vue.$http.request({
      ...this.config,
      url: `${this.config.url}/${hashId}`,
      method: 'PUT',
      data,
    })
    return plainToClass(Tournament, response.data)
  }

  public async delete(hashId: string) {
    await Vue.$http.request({
      ...this.config,
      url: `${this.config.url}/${hashId}`,
      method: 'DELETE',
    })
  }

}
