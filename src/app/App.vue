<template>
  <v-app>
    <AppBar />

    <v-content>
      <router-view />
    </v-content>
    <Footer />
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import AppBar from './components/AppBar.vue'
import Footer from './components/footer/Footer.vue'

export default defineComponent({
  components: { AppBar, Footer },
  setup() {
    return {}
  },
})
</script>

<style lang="scss"></style>
