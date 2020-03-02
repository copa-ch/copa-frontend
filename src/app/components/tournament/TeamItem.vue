<template>
  <tr>
    <td>{{team.name}}</td>
    <td class="action">
      <button class="button is-danger is-light" @click="removeTeam(team.id)">
        <span class="icon">
          <font-awesome-icon icon="trash" />
        </span>
      </button>
    </td>
  </tr>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { actions } from '@/app/effects/tournament-teams-api.effect'

export default defineComponent({
  components: {
    FontAwesomeIcon,
  },
  props: {
    team: Object,
  },
  setup(props, context) {
    const removeTeam = (teamId: string) => {
      actions.removeTournamentTeam(context.parent!.$route.params.id, teamId)
    }

    return {
      removeTeam,
    }
  },
})
</script>

<style lang="scss" scoped>
section#tournament-team-list {
  table {
    td {
      vertical-align: middle;

      &.action {
        width: 64px;
      }
    }
  }
}
</style>
