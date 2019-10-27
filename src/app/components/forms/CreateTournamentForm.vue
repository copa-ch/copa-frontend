import { States } from '@/app/models/States'
import { States } from '@/app/models/States'
<template>
  <div class="columns">
    <div class="column is-two-thirds padded">
      <h4 class="title is-4">{{ $t('createTournament.title') }}</h4>

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

      <b-field :label="$t('createTournament.email.label')"
               :type="getFieldType('email')"
               :message="getFieldMessage('email')">
        <b-input
          v-model="email"
          icon="envelope"
          type="email"
          :placeholder="$t('createTournament.email.placeholder')"
          expanded
        ></b-input>
      </b-field>

      <b-field>
        <p class="control">
          <button class="button is-primary" @click="submitForm()">{{ $t('createTournament.submitButton') }}</button>
        </p>
      </b-field>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { email, minLength, required } from 'vuelidate/lib/validators'
  import { RequestState } from '@/app/models/States'
  import { API } from '@/app/api'

  @Component({
    validations: {
      name: { required, minLength: minLength(1) },
      owner: { required, minLength: minLength(1) },
      email: { required, minLength: minLength(1), email },
    },
  })
  export default class CreateTournamentForm extends Vue {
    name = ''
    owner = ''
    email = ''
    submitStatus: RequestState = RequestState.PRISTINE

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

    async submitForm() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.submitStatus = RequestState.PENDING
        const createdTournament = await API.Tournament.create({
          name: this.name,
          owner: this.owner,
          email: this.email,
        })
        this.submitStatus = RequestState.SUCCESSFUL
        await this.$router.push({ name: 'tournament-admin', params: { id: createdTournament.adminId } })
      }
    }
  }
</script>
