import Vue from 'vue'
import { AxiosRequestConfig } from 'axios'
import { plainToClass } from 'class-transformer'
import { defaultApiConfig } from '@/config/api.config'
import { Game } from '@/app/models/Game'

export class TournamentScheduleApi {

  private readonly config: AxiosRequestConfig = {}

  constructor(private tournamentId: string) {
    this.config = {
      ...defaultApiConfig,
      url: `tournament/${tournamentId}/schedule`,
    }
  }

  async generate(): Promise<Game[]> {
    const response = await Vue.$http.request({
      ...this.config,
      method: 'PUT',
      url: this.config.url + '/generate',
    })
    return (response.data as any[]).map(row => plainToClass(Game, row))
  }

}
