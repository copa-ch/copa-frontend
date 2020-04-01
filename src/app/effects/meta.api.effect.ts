import Vue from "vue"
import { ref } from "@vue/composition-api"
import { plainToClass } from "class-transformer"
import { defaultApiConfig } from "@/config/api.config"
import { ApiInformation } from "@/app/models/ApiInformation"

export const useApiInformation = () => {
  const isPending = ref(false)
  const apiVersion = ref<string>(null)

  const getApiInformation = async () => {
    isPending.value = true
    const response = await Vue.$http.request({
      ...defaultApiConfig,
    })
    isPending.value = false
    const apiInformation = plainToClass(ApiInformation, response.data)
    apiVersion.value = apiInformation.version
  }

  return {
    isPending,
    apiVersion,
    getApiInformation,
  }
}
