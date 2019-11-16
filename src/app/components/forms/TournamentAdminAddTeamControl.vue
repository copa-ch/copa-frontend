<template>
  <b-field :type="{ 'is-danger': hasError }">
    <b-input
      icon="user"
      placeholder="Enter Teamname"
      v-model="teamName"
      :disabled="isLoading"
      :loading="isLoading"
      expanded
      @keypress.enter.native="addTeam()"
    ></b-input>
    <p class="control">
      <b-button icon-left="plus" type="is-primary" @click="addTeam()" :disabled="isLoading">Add Team</b-button>
    </p>
  </b-field>
</template>

<script lang="ts">
  import { Component, Emit, Mixins, Prop } from 'vue-property-decorator'
  import { RequestState } from '@/app/models/States'
  import { Tournament } from '@/app/models/Tournament'
  import { API } from '@/app/api'
  import { Action } from 'vuex-class'
  import { FixtruesStoreActions } from '@/app/store/accessors'
  import TournamentMixin from '@/app/mixins/admin/Tournament'

  @Component
  export default class TournamentAdminAddTeamControl extends Mixins(TournamentMixin) {
    teamName = ''
    hasError = false
    state: RequestState = RequestState.PRISTINE

    @Prop({ required: true })
    tournament!: Tournament

    @Action(FixtruesStoreActions.Generate)
    generateFixtures!: (tournamentHash: string) => Promise<void>

    get isTeamNameValid() {
      return this.teamName && this.teamName.length > 0
    }

    get isLoading() {
      return this.state === RequestState.PENDING
    }

    async addTeam() {
      if (this.isTeamNameValid) {
        this.hasError = false
        this.state = RequestState.PENDING
        try {
          await API.Tournament.of(this.tournament.visitorId).Team.addTeam({
            name: this.teamName,
          })
          this.teamName = ''
          this.state = RequestState.PRISTINE
          await this.generateFixtures(this.hash)
          this.notifyAddTeam()
        } catch (_) {
          this.$buefy.snackbar.open({
            message: 'Could not create the team!',
            type: 'is-warning',
            position: 'is-top',
            actionText: 'Retry',
            indefinite: true,
            onAction: () => {
              this.addTeam()
            },
          })
        }
      } else {
        this.hasError = true
      }
    }

    @Emit('addTeam')
    private notifyAddTeam() {
      // Notifier
    }
  }
</script>

<style scoped lang="scss">
</style>
