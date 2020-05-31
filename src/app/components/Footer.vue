<template>
  <v-footer absolute class="footer">
    <v-col class="text-center body-2" cols="12">
      <strong>COPA</strong> by Gery Hirschfeld & Robert Kleger. <br />The source
      code is licensed Apache-2.0. <br /><br />
      App Version 1.16.0, API Version 2.34.0
    </v-col>
  </v-footer>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  setup() {
    return {}
  },
})
</script>

<style lang="scss">
.footer {
  margin-bottom: -120px;
}
</style>
