import Vue from 'vue'
import { classToPlain, plainToClass } from 'class-transformer'
import { Tournament } from '../models/Tournament'
import { CreateTournamentRequest } from '@/app/models/CreateTournamentRequest'

const BASE_PATH = '/api/tournament'

export async function createTournament(createTournamentRequest: CreateTournamentRequest): Promise<Tournament> {
  const response = await Vue.$http.post(BASE_PATH, classToPlain(createTournamentRequest))
  return plainToClass(Tournament, response.data)
}
