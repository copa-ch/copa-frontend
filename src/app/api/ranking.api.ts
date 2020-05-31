import { Request, HttpResponse } from './request'
import { RankingDto } from '../dto/ranking.dto'

const request = Request('/tournament')

export const getRanking = async (
  hash: string,
): Promise<HttpResponse<RankingDto[]>> => {
  return request()
    .url(`/${hash}/ranking`)
    .returns(RankingDto)
    .isList()
    .fire()
}
