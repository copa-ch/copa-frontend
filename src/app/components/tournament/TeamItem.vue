<template>
  <tr>
    <td>{{team.name}}</td>
    <td class="action">
      <button class="button is-danger is-light" @click="remove()">
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
import { Team } from '@/app/models/Team'
import { removeTeam } from '@/app/effects/teams.effect'

export default defineComponent({
  components: {
    FontAwesomeIcon,
  },
  props: {
    team: {
      required: true,
      type: Team,
    },
  },
  setup(props, context) {

    const remove = () => {
      removeTeam(context.root.$route.params.id, props.team.id)
    }

    return {
      remove,
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
