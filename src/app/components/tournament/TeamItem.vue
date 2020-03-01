<template>
  <tr>
    <td>{{team.name}}</td>
    <td class="action">
      <button class="button is-danger is-light">
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

export default defineComponent({
  components: {
    FontAwesomeIcon,
  },
  props: {
    team: Object,
  },
  setup() {

  },
})
</script>

<style lang="scss" scoped>
section#tournament-team-list {
  margin-bottom: 32px;

  table {
    td {
      vertical-align: middle;

      &.action {
        width: 15px;
      }
    }
  }
}
</style>
