import { Request, HttpResponse } from './request'

const request = Request('/tournament')

export const generateGamePlan = async (
  hash: string,
): Promise<HttpResponse<undefined>> => {
  return request()
    .url(`/${hash}/generator`)
    .fire()
}
