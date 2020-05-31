<template>
  <section class="banner">
    <div class="banner-body">
      <div class="banner-title" v-if="!isLoading">
        <h1 class="display-1">
          {{ title }}
          <v-tooltip bottom v-if="state">
            <template v-slot:activator="{ on }">
              <v-chip small v-on="on" :ripple="false" color="primary">
                {{ $t(`tournament.state.${state.toLowerCase()}.label`) }}
              </v-chip>
            </template>
            <span>{{
              $t(`tournament.state.${state.toLowerCase()}.hint`)
            }}</span>
          </v-tooltip>
        </h1>
        <h2 class="title">{{ subtitle }}</h2>
      </div>
      <div class="banner-loading" v-if="isLoading">
        <v-skeleton-loader
          class="title"
          width="200"
          type="text"
        ></v-skeleton-loader>
        <v-skeleton-loader
          class="subtitle"
          width="200"
          type="text"
        ></v-skeleton-loader>
      </div>
      <slot name="body"></slot>
    </div>
    <div class="banner-foot">
      <slot name="footer"></slot>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
  },
  setup() {
    return {}
  },
})
</script>

<style lang="scss">
.banner {
  position: relative;
  background: linear-gradient(90deg, #5f3dc4 0%, #ff3860 50%, #fcc419 100%);
  background: linear-gradient(
    90deg,
    rgba($color: #5f3dc4, $alpha: 0.8) 0%,
    rgba($color: #ff3860, $alpha: 0.8) 50%,
    rgba($color: #fcc419, $alpha: 0.8) 100%
  );
  color: white;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 48px;
  padding-bottom: 60px;

  .banner-body {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
  }

  .banner-foot {
    position: absolute;
    bottom: 0;
    width: 100%;
    background: linear-gradient(
      90deg,
      rgba($color: #5f3dc4, $alpha: 1) 0%,
      rgba($color: #ff3860, $alpha: 1) 50%,
      rgba($color: #fcc419, $alpha: 1) 100%
    );

    .container {
      padding-top: 0 !important;
      padding-bottom: 0 !important;
    }
  }

  .banner-title {
    text-align: center;
  }

  .banner-loading .title .v-skeleton-loader__text {
    height: 30px;
  }
  .banner-loading .subtitle .v-skeleton-loader__text {
    height: 15px;
  }
}
</style>
