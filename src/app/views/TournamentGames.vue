<template>
  <section>
    <v-container>
      <Heading size="small" padded> {{ $t('games.title') }}</Heading>
      <p class="body-1">{{ $t('games.description.open') }}</p>
      <br />
      <GeneratorConfig />
      <br />
      <GameList />
    </v-container>
  </section>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import Heading from '../components/Heading.vue'
import GeneratorConfig from '../components/games/GeneratorConfig.vue'
import GameList from '../components/games/GameList.vue'

export default defineComponent({
  components: { Heading, GeneratorConfig, GameList },

  setup() {
    return {}
  },
})
</script>

<style lang="scss"></style>
