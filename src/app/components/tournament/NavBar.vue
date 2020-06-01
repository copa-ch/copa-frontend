<template>
  <v-container>
    <v-tabs centered fixed-tabs background-color="transparent" dark>
      <v-tab
        v-if="isOpen || isPlanable"
        link
        :to="{ name: 'tournament.teams', params: { hash: hash } }"
      >
        {{ $t('teams.title') }}
      </v-tab>

      <v-tab
        v-if="isPlanable && isAdmin"
        link
        :to="{ name: 'tournament.generator', params: { hash: hash } }"
      >
        {{ $t('generator.title') }}
      </v-tab>

      <v-tab
        v-if="isPlayable || isClosed"
        link
        :to="{ name: 'tournament.games', params: { hash: hash } }"
      >
        {{ $t('games.title') }}
      </v-tab>

      <v-tab
        v-if="isPlayable || isClosed"
        link
        :to="{ name: 'tournament.ranking', params: { hash: hash } }"
      >
        {{ $t('ranking.title') }}
      </v-tab>

      <v-tab
        v-if="isAdmin"
        link
        :to="{ name: 'tournament.settings', params: { hash: hash } }"
      >
        {{ $t('settings.title') }}
      </v-tab>
    </v-tabs>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
import { useTournament } from '../../reactive/tournament.state'

export default defineComponent({
  setup(props, { root }) {
    const {
      tournament,
      isOpen,
      isPlanable,
      isPlayable,
      isClosed,
      isAdmin,
    } = useTournament()

    const hash = computed(() => root.$route.params.hash)

    return {
      hash,
      tournament,
      isOpen,
      isPlanable,
      isPlayable,
      isClosed,
      isAdmin,
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
