<template>
  <section class="hero" :class="type">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">{{ title }}</h1>
        <h2 class="subtitle">{{ subtitle }}</h2>
        <slot></slot>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Hero extends Vue {
  @Prop({ default: '' }) title!: string
  @Prop({ default: '' }) subtitle!: string
  @Prop({ default: '' }) type!: string
}
</script>

<style lang="scss" scoped></style>
