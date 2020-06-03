<template>
  <section>
    <v-container>
      <Heading size="small" padded>Ranking</Heading>
      <Ranking />
    </v-container>
  </section>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import Heading from '../components/Heading.vue'
import Ranking from '../components/ranking/Ranking.vue'

export default defineComponent({
  components: { Heading, Ranking },

  setup() {
    return {}
  },
})
</script>

<style lang="scss"></style>
