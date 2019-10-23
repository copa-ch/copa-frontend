<template>
  <section id="id">
    <section class="hero is-dark is-bold">
      <div class="hero-body">
        <div class="container">
          <p class="title">{{ $t('home.title') }}</p>
          <p class="subtitle">{{ $t('home.subtitle') }}</p>
        </div>
      </div>
    </section>
    <section>
      <div class="container">
        <CreateTournamentForm />
      </div>
    </section>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import CreateTournamentForm from '../components/CreateTournamentForm.vue'

@Component({
  components: {
    CreateTournamentForm,
  },
})
export default class Home extends Vue {}
</script>

<style lang="sass" scoped></style>
