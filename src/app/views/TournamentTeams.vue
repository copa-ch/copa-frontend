<template>
  <section>
    <v-container>
      <Heading size="small" padded>{{ $t('teams.title') }}</Heading>
      <p class="body-1">{{ $t('teams.description.open') }}</p>
      <Teams />
    </v-container>
  </section>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import Heading from '../components/Heading.vue'
import Teams from '../components/teams/Teams.vue'

export default defineComponent({
  components: { Heading, Teams },
  setup() {
    return {}
  },
})
</script>

<style lang="scss"></style>
