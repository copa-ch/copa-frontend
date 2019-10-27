<template>
  <section class="hero is-dark" v-if="tournament">
    <div class="hero-body is-center">
      <h1 class="title is-2">{{ tournament.name }}</h1>
      <h2 class="subtitle is-5">by {{ tournament.owner }}</h2>
      <slot></slot>
    </div>
  </section>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { Tournament } from '@/app/models/Tournament'

  @Component
  export default class TournamentHeading extends Vue {
    @Prop() tournament!: Tournament
  }
</script>
