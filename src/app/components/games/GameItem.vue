<template>
  <div class="game">
    <div class="game__team game__team--host">
      <strong>{{ game.host.name }}</strong>
    </div>
    <div class="game__score">
      vs
    </div>
    <div class="game__team game__team--guest">
      <strong>{{ game.guest.name }}</strong>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { GameDto } from '../../dto/game.dto'

export default defineComponent({
  props: {
    game: {
      type: Object as () => GameDto,
    },
  },
})
</script>

<style lang="scss">
@import '../../../scss/variables.scss';

.game {
  display: flex;
  padding: 15px;
  border-top: 1px solid $c-grey-light;
  justify-content: center;
  align-items: center;

  &:last-child {
    border-bottom: 1px solid $c-grey-light;
  }

  .game__team {
    display: flex;
    flex: 1;
    align-items: center;

    &.game__team--host {
      justify-content: flex-end;
      padding-right: 15px;
      text-align: right;
    }

    &.game__team--guest {
      padding-left: 15px;
    }
  }
  .game__score {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid $c-grey-light;
    padding: 4px 18px;
    color: $c-grey;
    max-height: 34px;
  }
}
</style>
