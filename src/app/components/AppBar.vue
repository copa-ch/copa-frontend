<template>
  <v-app-bar app color="white">
    <v-container class="app-bar-centered">
      <v-toolbar-title class="logo">
        <img :src="require('../../assets/logo.svg')" alt="logo" />
        <span class="text">COPA</span>
      </v-toolbar-title>
      <div class="links">
        <router-link
          :to="{ name: 'home.index' }"
          v-slot="{ href, route, navigate, isActive, isExactActive }"
        >
          <v-btn
            text
            small
            :class="isExactActive ? 'is-active' : ''"
            :href="href"
            @click="navigate"
          >
            {{ $t('home.link') }}
          </v-btn>
        </router-link>

        <router-link
          :to="{ name: 'about' }"
          v-slot="{ href, route, navigate, isActive }"
        >
          <v-btn
            text
            small
            :class="isActive ? 'is-active' : ''"
            :href="href"
            @click="navigate"
          >
            {{ $t('about.link') }}
          </v-btn>
        </router-link>

        <router-link
          :to="{ name: 'privacy' }"
          v-slot="{ href, route, navigate, isActive }"
        >
          <v-btn
            text
            small
            :class="isActive ? 'is-active' : ''"
            :href="href"
            @click="navigate"
          >
            {{ $t('privacy.link') }}
          </v-btn>
        </router-link>
      </div>
    </v-container>
  </v-app-bar>
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
@import '../../scss/variables.scss';

.app-bar-centered {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

a.is-active {
  color: $primary !important;
}

header.v-app-bar {
  top: 5px !important;

  .links {
    margin-left: 30px;

    span {
      font-weight: 800;
      font-family: 'Poppins';
      font-size: 1.1em;
    }
  }
}
header.v-app-bar::before {
  position: absolute;
  height: 5px;
  background: linear-gradient(90deg, #5f3dc4 0%, #ff3860 50.52%, #fcc419 100%);
  left: 0;
  top: -5px;
  right: 0;
  content: '';
}

.logo {
  img {
    max-height: 40px;
  }
  span.text {
    font-family: 'Poppins';
    font-weight: 800;
    font-size: 1.4em;
    vertical-align: super;
    margin-left: 4px;
  }
}
</style>
