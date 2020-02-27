import Vue from 'vue'
import { AxiosRequestConfig } from 'axios'
import { classToPlain, plainToClass } from 'class-transformer'
import { CreateTournamentRequest } from '@/app/models/CreateTournamentRequest'
import { Tournament } from '@/app/models/Tournament'
import { defaultApiConfig } from '@/config/api.config'
import { Team } from '@/app/models/Team'
import { CreateTeamRequest } from '@/app/models/CreateTeamRequest'

export class TournamentTeamApi {

  private readonly config: AxiosRequestConfig = {}

  constructor(private tournamentId: string) {
    this.config = {
      ...defaultApiConfig,
      url: `tournament/${tournamentId}/team`,
    }
  }

  async findAll(): Promise<Team[]> {
    const response = await Vue.$http.request({ ...this.config })
    return (response.data as any[]).map(row => plainToClass(Team, row))
  }

  async addTeam(createTeamRequest: CreateTeamRequest) {
    const response = await Vue.$http.request({
      ...this.config,
      method: 'POST',
      data: createTeamRequest,
    })
    return plainToClass(Team, response.data)
  }

  public async removeTeam(teamId: string) {
    await Vue.$http.request({
      ...this.config,
      url: `${this.config.url}/${teamId}`,
      method: 'DELETE',
    })
  }

}
