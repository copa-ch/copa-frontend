import Vue from 'vue'
import { ref } from '@vue/composition-api'
import { plainToClass } from 'class-transformer'
import { defaultApiConfig } from '@/config/api.config'
import { Tournament } from '@/app/models/Tournament'

export const useApiTournament = () => {
  const isPending = ref(false)
  const tournament = ref<Tournament>(null);

  const load = async (hashId: string) => {
    isPending.value = true

    const response = await Vue.$http.request({
      ...defaultApiConfig,
      url: `/tournament/${hashId}`,
    })

    isPending.value = false
    tournament.value = plainToClass(Tournament, response.data)
  }

  return {
    isPending,
    tournament,
    load,
  }
};
