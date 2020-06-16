<template>
  <section>
    <div v-for="(round, index) in rounds" :key="index" class="round">
      <h3 class="title">Round {{ index + 1 }}</h3>
      <GameItem
        v-for="(game, index) in round.games"
        :key="index"
        :game="game"
      />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from '@vue/composition-api'
import { API } from '../../api'
import { GameDto } from '../../dto/game.dto'
import GameItem from './GameItem.vue'

export default defineComponent({
  components: { GameItem },
  setup(props, { root }) {
    const games = ref<GameDto[]>([])
    const rounds = ref<{ games: GameDto[] }[]>([])

    onMounted(async () => {
      const response = await API.Tournament.generateGamePlan(
        root.$route.params.hash,
      )
      if (response.isSuccessful && response.data) {
        games.value = response.data
        const maxRound = games.value
          .map(g => g.round)
          .sort()
          .reverse()[0]
        const list: { games: GameDto[] }[] = []
        for (let index = 0; index < maxRound; index++) {
          list[index] = { games: [] }
        }
        games.value.forEach(game => list[game.round - 1].games.push(game))
        rounds.value = list
      }
    })

    return { rounds, games }
  },
})
</script>

<style lang="scss">
@import '../../../scss/variables.scss';

.round {
  margin-bottom: 45px;
  margin-bottom: 45px;
  .title {
    margin-bottom: 8px;
  }
}
</style>
