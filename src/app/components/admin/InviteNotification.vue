<template>
  <div class="columns is-centered">
    <div class="column" style="max-width: 550px" v-if="visitorLink">
      <div class="notification is-info is-center">
        <button class="delete" @click="notifyCloseNotification()"></button>
        <h4 class="subtitle is-4">{{ $t('admin.invite.title') }}</h4>
        <p>{{ $t('admin.invite.message') }}</p>
        <br/>
        <b-field position="is-centered">
          <b-input expanded :disabled="true" type="text" icon="link" :value="visitorLink"></b-input>
          <p class="control">
            <button
              class="button is-primary"
              v-clipboard="() => visitorLink"
            >{{ $t('admin.invite.copy') }}
            </button>
          </p>
        </b-field>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator'
  import { Tournament } from '../../models/Tournament'
  import { Getter } from 'vuex-class'
  import { TournamentStoreGetters } from '@/app/store/accessors'

  @Component
  export default class InviteNotification extends Vue {
    @Getter(TournamentStoreGetters.VisitorLink)
    visitorLink!: string

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
