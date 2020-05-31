import { Request, HttpResponse } from './request'
import { GameDto } from '../dto/game.dto'
import { CreateGameDto } from '../dto/create-game.dto'
import { UpdateGameDto } from '../dto/update-game.dto'

const request = Request('/tournament')

export const addGamePlan = async (
  hash: string,
  data: CreateGameDto[],
): Promise<HttpResponse<GameDto[]>> => {
  return request()
    .method('POST')
    .url(`/${hash}/game`)
    .data(data)
    .returns(GameDto)
    .isList()
    .fire()
}

export const findAllGames = async (
  hash: string,
): Promise<HttpResponse<GameDto[]>> => {
  return request()
    .url(`/${hash}/game`)
    .returns(GameDto)
    .isList()
    .fire()
}

export const findGame = async (
  hash: string,
  gameId: string,
): Promise<HttpResponse<GameDto>> => {
  return request()
    .url(`/${hash}/game/${gameId}`)
    .returns(GameDto)
    .fire()
}

export const updateGame = async (
  hash: string,
  gameId: string,
  data: UpdateGameDto,
): Promise<HttpResponse<GameDto>> => {
  return request()
    .method('PUT')
    .url(`/${hash}/game/${gameId}`)
    .data(data)
    .returns(GameDto)
    .fire()
}
