<template>
  <section class="c-heading" :class="padded ? 'is-padded' : ''">
    <h1 v-if="size === 'large'" class="display-3"><slot /></h1>
    <h1 v-if="size === 'normal'" class="display-2"><slot /></h1>
    <h1 v-if="size === 'small'" class="display-1"><slot /></h1>
    <hr v-if="hasBorder" class="divider" />
  </section>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    size: {
      type: String,
      default: 'normal',
      validator: val => ['small', 'normal', 'large'].includes(val),
    },
    hasBorder: {
      type: Boolean,
      default: true,
    },
    padded: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    return {}
  },
})
</script>

<style lang="scss">
.c-heading {
  display: inline-block;
  min-width: 220px;

  &.is-padded {
    padding-top: 24px;
    padding-bottom: 12px;
  }
}
</style>
