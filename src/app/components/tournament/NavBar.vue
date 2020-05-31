<template>
  <v-container>
    <v-tabs centered fixed-tabs background-color="transparent" dark>
      <v-tab link :to="{ name: 'tournament.teams', params: { hash: hash } }">
        Teams
      </v-tab>

      <v-tab link :to="{ name: 'tournament.games', params: { hash: hash } }">
        Games
      </v-tab>

      <v-tab link :to="{ name: 'tournament.ranking', params: { hash: hash } }">
        Ranking
      </v-tab>

      <v-tab link :to="{ name: 'tournament.settings', params: { hash: hash } }">
        Settings
      </v-tab>
    </v-tabs>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
import { useTournament } from '../../reactive/tournament.state'

export default defineComponent({
  setup(props, { root }) {
    const { tournament } = useTournament()

    const hash = computed(() => root.$route.params.hash)

    return {
      hash,
      tournament,
    }
  },
})
</script>

<style lang="scss">
.v-tabs-slider-wrapper {
  height: 4px !important;
}
.theme--dark.v-tabs > .v-tabs-bar .v-tab:not(.v-tab--active),
.theme--dark.v-tabs > .v-tabs-bar .v-tab:not(.v-tab--active) > .v-icon,
.theme--dark.v-tabs > .v-tabs-bar .v-tab:not(.v-tab--active) > .v-btn,
.theme--dark.v-tabs > .v-tabs-bar .v-tab--disabled {
  color: rgba(255, 255, 255, 0.8);
}
</style>
