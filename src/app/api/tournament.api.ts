import Vue from 'vue'
import { AxiosRequestConfig } from 'axios'
import { classToPlain, plainToClass } from 'class-transformer'
import { CreateTournamentRequest } from '@/app/models/CreateTournamentRequest'
import { Tournament } from '@/app/models/Tournament'
import { defaultApiConfig } from '@/config/api.config'

export class TournamentApi {

  private config: AxiosRequestConfig = {
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

}
