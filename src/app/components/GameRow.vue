<template>
  <div class="game">
    <div class="team-item is-host">
      <div class="inner">
        <span class="subtitle">{{ game.host.name }}</span>
      </div>
    </div>
    <div class="score-item">
      <div v-if="!isPlayable" class="inner">
        <span>VS</span>
      </div>
      <div v-if="isPlayable" class="inner" style="border: none">
        <b-field :type="isSuccessful ? 'is-success' : ''">
          <b-input v-model.trim="hostScore"
                   :loading="isPending"
                   :disabled="isPending"
                   maxlength="3"
                   :has-counter="false"
                   @blur="updateGameScore()"></b-input>
        </b-field>
        <span>:</span>
        <b-field :type="isSuccessful ? 'is-success' : ''">
          <b-input v-model.trim="guestScore"
                   :loading="isPending"
                   :disabled="isPending"
                   maxlength="3"
                   :has-counter="false"
                   @blur="updateGameScore()"></b-input>
        </b-field>
      </div>
    </div>
    <div class="team-item is-guest">
      <div class="inner">
        <span class="subtitle">{{ game.guest.name }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Mixins, Prop } from 'vue-property-decorator'
  import { Game } from '@/app/models/Game'
  import { RequestState } from '@/app/models/States'
  import { API } from '@/app/api'
  import { LogdownInstance } from '@/types/logdown'
  import { Action } from 'vuex-class'
  import { FixtruesStoreActions } from '@/app/store/accessors'
  import TournamentMixin from '@/app/mixins/admin/Tournament'

  @Component
  export default class GameRow extends Mixins(TournamentMixin) {
    logger!: LogdownInstance
    hostScore: string = ''
    guestScore: string = ''
    state: RequestState = RequestState.PRISTINE

    @Prop()
    readonly game!: Game

    @Prop({ default: false })
    readonly isPlayable!: boolean

    @Action(FixtruesStoreActions.UpdateGame)
    updateGame!: (game: Game) => Promise<void>

    constructor() {
      super()
      this.logger = this.$createLogger(GameRow.name)
    }

    get isPending() {
      return this.state === 'PENDING'
    }

    get isSuccessful() {
      return this.state === 'SUCCESSFUL'
    }

    get isPlayed() {
      return Number.isInteger(parseInt(this.hostScore, 10)) && Number.isInteger(parseInt(this.guestScore, 10))
    }

    get hasScoreChanged() {
      return parseInt(this.hostScore, 10) !== this.game.hostScore || parseInt(this.guestScore, 10) !== this.game.guestScore
    }

    mounted() {
      if (this.game
        && this.game.hostScore !== undefined
        && this.game.guestScore !== undefined
        && this.game.hostScore !== null
        && this.game.guestScore !== null) {
        this.hostScore = this.game.hostScore.toString()
        this.guestScore = this.game.guestScore.toString()
      }
    }

    async updateGameScore() {
      this.logger.info('updateGameScore - isPlayed', this.isPlayed)
      this.logger.info('updateGameScore - hasScoreChanged', this.hasScoreChanged)
      if (this.isPlayed && this.hasScoreChanged) {
        this.state = RequestState.PENDING
        const game = await API.Tournament.of(this.hash).Game.update(this.game.id, {
          hostScore: parseInt(this.hostScore, 10),
          guestScore: parseInt(this.guestScore, 10),
        })
        await this.updateGame(game)
        this.state = RequestState.SUCCESSFUL
      }
    }
  }
</script>

<style lang="scss">
  @import '../../styles/variables';
  @import '~bulma/sass/utilities/all';

  .game {
    display: flex;
    width: 100%;
    border-top: 2px solid $light;

    .field {
      margin-bottom: 0 !important;
    }

    &:last-child {
      border-bottom: 2px solid $light;
    }

    .team-item {
      flex: 1;
      padding: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;

      .inner {
      }

      &.is-host {
        justify-content: flex-end;
      }

      &.is-guest {
        justify-content: flex-start;
      }
    }

    .score-item {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 1rem;

      .inner {
        display: flex;
        border: 1px solid $light;
        width: 160px;
        height: 40px;
        justify-content: center;
        align-items: center;

        input {
          text-align: center;
        }

        span {
          padding-left: 6px;
          padding-right: 6px;
        }
      }
    }
  }
</style>
