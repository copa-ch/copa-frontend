<template>
  <div class="columns is-centered">
    <div class="column" style="max-width: 550px">
      <div class="notification is-info is-center">
        <button class="delete" :disabled="isPending" @click="notifyCloseNotification()"></button>
        <h4 class="subtitle is-4">{{ $t('admin.start.title') }}</h4>
        <p class>{{ $t('admin.start.message') }}</p>
        <br/>
        <b-button
          type="is-primary"
          :disabled="isPending"
          :loading="isPending"
          @click="startTournament()"
        >{{ $t('admin.start.action') }}
        </b-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Emit, Mixins, Prop, Watch } from 'vue-property-decorator'
  import { Tournament } from '@/app/models/Tournament'
  import { Getter, Action } from 'vuex-class'
  import {
    TournamentStoreGetters,
    TournamentStoreActions,
  } from '@/app/store/accessors'
  import { RequestState } from '@/app/models/States'
  import { API } from '@/app/api'
  import { TournamentState } from '@/app/models/TournamentState'
  import TournamentMixin from '@/app/mixins/admin/Tournament'

  @Component
  export default class StartNotification extends Mixins(TournamentMixin) {
    state: RequestState = RequestState.PRISTINE

    @Getter(TournamentStoreGetters.Tournament)
    tournament!: Tournament

    @Action(TournamentStoreActions.Load)
    loadTournament!: (id: string) => Promise<void>

    get isPending() {
      return this.state === RequestState.PENDING
    }

    async startTournament() {
      this.state = RequestState.PENDING
      await API.Tournament.update(this.hash, {
        ...this.tournament,
        state: TournamentState.Playable,
      })
      await this.loadTournament(this.hash)
      this.state = RequestState.SUCCESSFUL
    }

    @Emit('close')
    notifyCloseNotification() {
      // Notifier
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../../../node_modules/bulma/sass/utilities/all';

  section.section {
    padding: 1.5rem 0 0 0;
  }
</style>
