import Vue from "vue"
import { computed, ref } from "@vue/composition-api"
import { classToPlain, plainToClass } from "class-transformer"
import { defaultApiConfig } from "@/config/api.config"
import { Tournament } from "@/app/models/Tournament"
import { CreateTournamentRequest } from "@/app/models/CreateTournamentRequest"
import { AxiosError, AxiosRequestConfig } from "axios"

const apiTournamentConfig: AxiosRequestConfig = {
  ...defaultApiConfig,
  url: "tournament",
}

export const useApiTournamentCreate = () => {
  const isPending = ref(false)
  const error = ref<AxiosError<Tournament>>(null)
  const createdTournament = ref<Tournament>({})

  const createTournament = async (
    createTournamentRequest: CreateTournamentRequest,
  ) => {
    isPending.value = true
    error.value = null
    const data = classToPlain(createTournamentRequest)
    try {
      const response = await Vue.$http.request({
        ...apiTournamentConfig,
        method: "POST",
        data,
      })
      createdTournament.value = plainToClass(Tournament, response.data)
    } catch (exception) {
      error.value = exception
    }

    isPending.value = false
    return createdTournament
  }

  return {
    isPending,
    createdTournament,
    hasError: computed(() => !!error.value),
    createTournament,
  }
}
