<template>
  <section id="home">
    <section class="hero is-dark is-fullheight">
      <div class="hero-head">
        <Header :is-dark="true"></Header>
      </div>
      <div class="hero-body">
        <div class="container">
          <section class="is-center" style="padding-bottom: 1.5rem">
            <p class="title">{{ $t('home.title') }}</p>
            <p class="subtitle">{{ $t('home.subtitle') }}</p>
          </section>

          <section style="padding-bottom: 1.5rem">
            <div class="columns is-centered">
              <div class="column is-two-thirds-tablet is-half-desktop">
                <div class="notification is-info" style="display: flex">
                  <font-awesome-icon class="icon is-large" icon="hard-hat" style="margin-right: 10px" />
                  <p>{{ $t('home.beta') }}</p>
                </div>
                <div class="box">
                  <CreateTournamentForm />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import CreateTournamentForm from '../components/forms/CreateTournamentForm.vue'
import Header from '@/app/components/layout/Header.vue'

@Component({
  components: {
    Header,
    CreateTournamentForm,
  },
})
export default class Home extends Vue {}
</script>
