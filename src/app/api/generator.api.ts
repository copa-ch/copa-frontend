import { Request, HttpResponse } from './request'
import { GameDto } from '../dto/game.dto'

const request = Request('/tournament')

export const generateGamePlan = async (
  hash: string,
): Promise<HttpResponse<GameDto[]>> => {
  return request()
    .method('POST')
    .url(`/${hash}/generator`)
    .returns(GameDto)
    .isList()
    .fire()
}
