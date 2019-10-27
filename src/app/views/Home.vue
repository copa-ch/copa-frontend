<template>
  <section id="home">
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
import CreateTournamentForm from '../components/forms/CreateTournamentForm.vue'

@Component({
  components: {
    CreateTournamentForm,
  },
})
export default class Home extends Vue {}
</script>
