import Vue from 'vue'
import { TournamentApi } from '@/app/effects/api/tournament.api'
import { plainToClass } from 'class-transformer'
import { defaultApiConfig } from '@/config/api.config'
import { ApiInformation } from '@/app/models/ApiInformation'

export const API = {
  getInfo: async () => {
    const response = await Vue.$http.request({
      ...defaultApiConfig,
    })
    return plainToClass(ApiInformation, response.data)
  },
  Tournament: new TournamentApi(),
}

