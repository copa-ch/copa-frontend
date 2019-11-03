<template>
  <div class="game">
    <div class="team-item is-host">
      <div class="inner">
        <span class="subtitle">{{ game.host.name }}</span>
      </div>
    </div>
    <div class="score-item">
      <div class="inner">VS</div>
    </div>
    <div class="team-item is-guest">
      <div class="inner">
        <span class="subtitle">{{ game.guest.name }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Game } from '@/app/models/Game'

@Component
export default class GameRow extends Vue {
  @Prop()
  game!: Game
}
</script>

<style lang="scss">
@import '../../styles/variables';
@import '~bulma/sass/utilities/all';

.game {
  display: flex;
  width: 100%;
  border-top: 2px solid $light;

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
      width: 80px;
      height: 40px;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
