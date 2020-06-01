<template>
  <v-card flat outlined>
    <v-card-title>Generator</v-card-title>
    <v-card-subtitle
      >Configure the generator to generate your personal fixture
      schedule.</v-card-subtitle
    >
    <v-card-text>
      <v-btn color="primary" @click="submit">Generate fixtures</v-btn>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  components: {},
  setup() {
    return {}
  },
})
</script>

<style lang="scss"></style>
