<template>
  <section class="hero is-bold is-dark" v-if="tournament">
    <div class="hero-head">
      <Header :is-dark="true"></Header>
    </div>
    <div class="hero-body is-center">
      <h1 class="title is-2">{{ tournament.name }}</h1>
      <h2 class="subtitle is-5">by {{ tournament.owner }}</h2>
      <slot></slot>
    </div>
    <div class="hero-foot">
      <nav class="tabs is-boxed is-fullwidth">
        <div class="container">
          <TournamentAdminTabs></TournamentAdminTabs>
        </div>
      </nav>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Tournament } from '@/app/models/Tournament'
import Header from '@/app/components/layout/Header.vue'
import TournamentAdminTabs from '@/app/components/admin/TournamentAdminTabs.vue'

@Component({
  components: { TournamentAdminTabs, Header },
})
export default class TournamentHeading extends Vue {
  @Prop() tournament!: Tournament
}
</script>
