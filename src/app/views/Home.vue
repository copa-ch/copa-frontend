<template>
  <section class="home">
    <v-container>
      <v-row>
        <v-col xs="12" sm="12" md="5" lg="5" xl="5">
          <br />
          <router-view />
        </v-col>
        <v-col
          v-if="$vuetify.breakpoint.mdAndUp"
          xs="0"
          sm="0"
          md="7"
          lg="7"
          xl="7"
        >
          <img
            class="home-banner"
            alt="banner"
            :src="require('../../assets/background-2.svg')"
          />
        </v-col>
      </v-row>
    </v-container>
  </section>
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
.home {
  min-height: 100vh;
}

img.home-banner {
  margin-top: -20px;
  position: absolute;
  top: 0;
  right: 0;
  max-width: 50%;
  max-height: 90vh;
}

@media only screen and (max-width: 960px) {
  img.home-banner {
    max-width: 40%;
  }
}

@media only screen and (max-width: 600px) {
  img.home-banner {
    max-width: 20%;
  }
}
</style>
