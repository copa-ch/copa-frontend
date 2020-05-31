import { CreatedTournamentDto } from '../dto/created-tournament.dto'
import { CreateTournamentDto } from '../dto/create-tournament.dto'
import { Request, HttpResponse } from './request'
import { UpdateTournamentDto } from '../dto/update-tournament.dto'
import { TournamentDto } from '../dto/tournament.dto'

const request = Request('/tournament')

export const create = async (
  data: CreateTournamentDto,
): Promise<HttpResponse<CreatedTournamentDto>> => {
  return request()
    .method('POST')
    .data(data)
    .returns(CreatedTournamentDto)
    .fire()
}

export const findOne = async (
  hash: string,
): Promise<HttpResponse<TournamentDto>> => {
  return request()
    .url(`/${hash}`)
    .returns(CreatedTournamentDto)
    .fire()
}

export const update = async (
  hash: string,
  data: UpdateTournamentDto,
): Promise<HttpResponse<TournamentDto>> => {
  return request()
    .method('PUT')
    .url(`/${hash}`)
    .data(data)
    .returns(TournamentDto)
    .fire()
}

export const destroy = async (
  hash: string,
): Promise<HttpResponse<undefined>> => {
  return await request()
    .method('DELETE')
    .url(`/${hash}`)
    .fire()
}
