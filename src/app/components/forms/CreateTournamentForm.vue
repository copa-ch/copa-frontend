<template>
  <section>
    <b-field
      :label="$t('createTournament.name.label')"
      :type="getFieldType('name')"
      :message="getFieldMessage('name')"
    >
      <b-input
        v-model="name"
        icon="trophy"
        :disabled="isPending"
        :loading="isPending"
        :placeholder="$t('createTournament.name.placeholder')"
        expanded
      ></b-input>
    </b-field>

    <br/>

    <b-field
      :label="$t('createTournament.owner.label')"
      :type="getFieldType('owner')"
      :message="getFieldMessage('owner')"
    >
      <b-input
        v-model="owner"
        icon="user"
        :disabled="isPending"
        :loading="isPending"
        :placeholder="$t('createTournament.owner.placeholder')"
        expanded
      ></b-input>
    </b-field>

    <br/>

    <b-field
      :label="$t('createTournament.email.label')"
      :type="getFieldType('email')"
      :message="getFieldMessage('email')">
      <b-input
        v-model="email"
        icon="envelope"
        :disabled="isPending"
        :loading="isPending"
        type="email"
        :placeholder="$t('createTournament.email.placeholder')"
        expanded></b-input>
    </b-field>

    <br/>

    <b-field>
      <p class="control">
        <b-button
          type="is-primary"
          :loading="isPending"
          @click="submitForm()">
          {{ $t('createTournament.submitButton') }}
        </b-button>
      </p>
    </b-field>
  </section>
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

    get isPending() {
      return this.submitStatus === 'PENDING'
    }

    getFieldType(fieldName: string) {
      return this.$v[fieldName].$error
        ? 'is-danger'
        : this.$v[fieldName].$dirty
          ? 'is-success'
          : ''
    }

    getFieldMessage(fieldName: string) {
      return this.$v[fieldName].$error
        ? this.$t('createTournament.name.message')
        : ''
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
        await this.$router.push({
          name: 'admin-teams',
          params: { id: createdTournament.adminId },
        })
      }
    }
  }
</script>
