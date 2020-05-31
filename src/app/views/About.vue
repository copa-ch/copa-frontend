<template>
  <section class="about">
    <v-container>
      <div class="content">
        <br />
        <Heading>{{ $t('about.title') }}</Heading>
      </div>
    </v-container>
  </section>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import Heading from '../components/Heading.vue'

export default defineComponent({
  components: { Heading },
  setup() {
    return {}
  },
})
</script>

<style lang="scss"></style>
