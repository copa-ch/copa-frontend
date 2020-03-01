import Vue from 'vue'
import { ref } from '@vue/composition-api'
import { plainToClass } from 'class-transformer'
import { defaultApiConfig } from '@/config/api.config'
import { Team } from '@/app/models/Team'

export const useApiTournamentTeams = (hashId: string) => {
  const isPending = ref(false)
  const teams = ref<Team[]>(null);

  const load = async () => {
    isPending.value = true

    const response = await Vue.$http.request({
      ...defaultApiConfig,
      url: `/tournament/${hashId}/team`,
    })

    isPending.value = false
    teams.value = (response.data as any[]).map(row => plainToClass(Team, row))
  }

  return {
    isPending,
    teams,
    load,
  }
};
