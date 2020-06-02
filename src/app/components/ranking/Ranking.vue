<template>
  <section>
    <v-card flat outlined>
      <v-skeleton-loader v-if="isLoading" type="table-tbody" />

      <v-data-table
        v-if="!isLoading"
        :headers="headers"
        :items="ranking"
        disable-sort
        disable-filtering
        disable-pagination
        hide-default-footer
        sort-by="position"
      />
    </v-card>
  </section>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from '@vue/composition-api'
import { RankingDto } from '../../dto/ranking.dto'
import { API } from '../../api'

export default defineComponent({
  components: {},
  setup(props, { root }) {
    const isLoading = ref(false)
    const ranking = ref<RankingDto[]>([])

    async function loadRanking() {
      isLoading.value = true

      const response = await API.Tournament.getRanking(root.$route.params.hash)

      if (response.isSuccessful && response.data) {
        ranking.value = response.data
      }

      isLoading.value = false
    }

    const headers = [
      {
        text: root.$t('ranking.table.position'),
        value: 'position',
        align: 'start',
      },
      {
        text: root.$t('ranking.table.team'),
        value: 'team.name',
      },
      {
        text: root.$t('ranking.table.played'),
        value: 'played',
      },
      {
        text: root.$t('ranking.table.won'),
        value: 'won',
      },
      {
        text: root.$t('ranking.table.drawn'),
        value: 'drawn',
      },
      {
        text: root.$t('ranking.table.lost'),
        value: 'lost',
      },
      {
        text: root.$t('ranking.table.goalsFor'),
        value: 'goals',
      },
      {
        text: root.$t('ranking.table.goalsAgainst'),
        value: 'goalsAgainst',
      },
      {
        text: root.$t('ranking.table.points'),
        value: 'points',
      },
    ]

    onBeforeMount(() => loadRanking())

    return {
      headers,
      ranking,
      isLoading,
    }
  },
})
</script>

<style lang="scss"></style>
