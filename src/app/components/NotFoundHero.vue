<template>
  <section class="hero is-bold is-dark is-fullheight">
    <div class="hero-head">
      <Header :is-dark="true"></Header>
    </div>
    <div class="hero-body">
      <div class="container is-center">
        <h1 class="title is-1">{{ $t('notFound.title') }}</h1>
        <h2 class="subtitle is-3">{{ $t('notFound.subtitle') }}</h2>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Header from '@/app/components/layout/Header.vue'

@Component({
  components: { Header },
})
export default class NotFoundHero extends Vue {}
</script>
