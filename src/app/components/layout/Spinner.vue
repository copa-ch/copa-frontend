<template>
  <section class="spinner" :class="small ? 'spinner--small':large ? 'spinner--large': ''">
    <div class="spinner__container">
      <b-icon class="spinner__ball"
              icon="volleyball-ball"
              pack="fas"/>
      <div class="spinner__shadow"></div>
    </div>
    <transition name="slide">
      <h3 v-if="!!message && !small" class="subtitle">{{message}}</h3>
    </transition>
  </section>
</template>

<script lang="ts">
  import {defineComponent} from '@vue/composition-api'

  export default defineComponent({
    props: {
      small: Boolean,
      large: Boolean,
      message: String,
    },
    setup() {

    },
  })
</script>

<style lang="scss">
  @import 'src/styles/utilities/all';

  $ball-size: 50px;
  $container-height: 200px;
  $ball-svg-width: 3.25rem !important;
  $ball-svg-height: 3.25rem !important;
  $ball-shadow-width: 60px;
  $ball-shadow-height: 22.5px;

  .spinner {
    position: relative;
    width: 100%;
    height: $container-height;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    margin-bottom: 10px;

    .subtitle {
      color: $black !important;
      padding: 15px 0;
    }
  }

  .spinner__container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .spinner__ball {
    position: absolute;
    width: $ball-size;
    height: $ball-size;
    background: $white;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    overflow: hidden;
    animation: ball 1.3s cubic-bezier(.12, 0, .87, 1) infinite;

    svg {
      width: 100% !important;
      height: 100% !important;
      color: $info;
    }
  }

  .spinner__shadow {
    position: absolute;
    width: $ball-shadow-width;
    height: $ball-shadow-height;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 50%;
    transform: translate(-50%, 100%);
    overflow: hidden;
    filter: blur(2px);
    z-index: -1;
    animation: shadow 1.3s cubic-bezier(.12, 0, .87, 1) infinite;
  }

  .spinner--small {
    height: ($container-height / 2);

    .spinner__ball {
      animation: ball-small 1.3s cubic-bezier(.12, 0, .87, 1) infinite;
      width: ($ball-size / 2);
      height: ($ball-size / 2);
    }

    .spinner__shadow {
      width: ($ball-shadow-width / 2);
      height: ($ball-shadow-height / 2);
    }
  }

  .spinner--large {
    height: ($container-height * 2);

    .spinner__container {
      top: 60%;
    }

    .spinner__ball {
      animation: ball-large 1.3s cubic-bezier(.12, 0, .87, 1) infinite;
      width: ($ball-size * 2);
      height: ($ball-size * 2);
    }

    .spinner__shadow {
      width: ($ball-shadow-width * 2);
      height: ($ball-shadow-height * 2);
    }
  }

  @keyframes ball-large {
    0% {
      transform: translate(-50%, -50%) translateY(-160px) rotate(0deg);
    }
    50% {
      transform: translate(-50%, -50%) translateY(0px) rotate(180deg);
    }
    100% {
      transform: translate(-50%, -50%) translateY(-160px) rotate(360deg);
    }
  }

  @keyframes ball {
    0% {
      transform: translate(-50%, -50%) translateY(-60px) rotate(0deg);
    }
    50% {
      transform: translate(-50%, -50%) translateY(0px) rotate(180deg);
    }
    100% {
      transform: translate(-50%, -50%) translateY(-60px) rotate(360deg);
    }
  }

  @keyframes ball-small {
    0% {
      transform: translate(-50%, -50%) translateY(-30px) rotate(0deg);
    }
    50% {
      transform: translate(-50%, -50%) translateY(0px) rotate(180deg);
    }
    100% {
      transform: translate(-50%, -50%) translateY(-30px) rotate(360deg);
    }
  }

  @keyframes shadow {
    0% {
      transform: translate(-50%, 100%) scale(1);
    }
    50% {
      transform: translate(-50%, 100%) scale(0.5);
    }
    100% {
      transform: translate(-50%, 100%) scale(1);
    }
  }

</style>
