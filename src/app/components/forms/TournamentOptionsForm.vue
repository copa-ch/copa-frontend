import { RequestState } from '@/app/models/States'
<template>
  <section v-if="tournament">
    <div class="columns is-multiline">
      <div class="column is-half">
        <b-field :label="$t('createTournament.name.label')"
                 :type="getFieldType('name')"
                 :message="getFieldMessage('name')">
          <b-input
            v-model="name"
            icon="trophy"
            :placeholder="$t('createTournament.name.placeholder')"
            expanded
          ></b-input>
        </b-field>
      </div>
    </div>

    <br>

    <div class="columns is-multiline">
      <div class="column is-half">
        <b-field :label="$t('createTournament.owner.label')"
                 :type="getFieldType('owner')"
                 :message="getFieldMessage('owner')">
          <b-input
            v-model="owner"
            icon="user"
            :placeholder="$t('createTournament.owner.placeholder')"
            expanded
          ></b-input>
        </b-field>
      </div>
    </div>

    <br>

    <b-field>
      <div class="control buttons">
        <b-button type="is-primary"
                  icon-left="save"
                  :disabled="isPending"
                  :loading="isPending"
                  @click="save()">
          Save
        </b-button>
      </div>
    </b-field>

    <hr>

    <div class="notification is-danger">
      <h4 class="title is-4">Delete this tournament</h4>
      <h4 class="subtitle is-6">Once you delete a tournament, there is no going back. Please be certain.</h4>
      <b-button type="is-danger"
                :disabled="isPending"
                :loading="isPending"
                inverted icon-left="trash" @click="deleteTournament()">
        Delete
      </b-button>
    </div>

  </section>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator'
  import { email, minLength, required } from 'vuelidate/lib/validators'
  import { RequestState } from '@/app/models/States'
  import { API } from '@/app/api'
  import { Action, Getter } from 'vuex-class'
  import { TournamentStoreActions, TournamentStoreGetters } from '@/app/store/types'
  import { Tournament } from '@/app/models/Tournament'

  @Component({
    validations: {
      name: { required, minLength: minLength(1) },
      owner: { required, minLength: minLength(1) },
    },
  })
  export default class TournamentOptionsForm extends Vue {
    state: RequestState = RequestState.PRISTINE
    name = ''
    owner = ''

    @Getter(TournamentStoreGetters.Tournament)
    tournament!: Tournament

    @Action(TournamentStoreActions.LoadTournament)
    loadTournament!: (id: string) => Promise<void>

    get isPending() {
      return this.state === RequestState.PENDING
    }

    mounted() {
      this.onTournamentUpdate()
    }

    @Watch('tournament')
    onTournamentUpdate() {
      this.name = this.tournament.name
      this.owner = this.tournament.owner
    }

    getFieldType(fieldName: string) {
      return this.$v[fieldName].$error
        ? 'is-danger'
        : this.$v[fieldName].$dirty
          ? 'is-success'
          : ''
    }

    getFieldMessage(fieldName: string) {
      return this.$v[fieldName].$error ? this.$t('createTournament.name.message') : ''
    }

    async deleteTournament() {
      this.state = RequestState.PENDING
      await API.Tournament.delete(this.$route.params.id)
      await this.$router.replace({ name: 'home' })
      this.state = RequestState.SUCCESSFUL
    }

    async save() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.state = RequestState.PENDING
        await API.Tournament.update(this.$route.params.id, {
          name: this.name,
          owner: this.owner,
          state: this.tournament.state,
        })
        await this.loadTournament(this.$route.params.id)
        this.state = RequestState.SUCCESSFUL
      }
    }
  }
</script>
