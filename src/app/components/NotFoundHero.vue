<template>
  <section class="hero is-dark is-fullheight-with-navbar">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          {{ $t('notFound.title') }}
        </h1>
        <h2 class="subtitle">
          {{ $t('notFound.subtitle') }}
        </h2>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component
  export default class NotFoundHero extends Vue {
  }
</script>
