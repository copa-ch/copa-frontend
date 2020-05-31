import Vue from "vue"
import { plainToClass } from "class-transformer"
import { defaultApiConfig } from "@/config/api.config"
import { APIInformationDto } from "../dto/api-information.dto"

export const getInfo = async (): Promise<APIInformationDto> => {
  const response = await Vue.$http.request({
    ...defaultApiConfig,
  })
  return plainToClass(APIInformationDto, response.data)
}
