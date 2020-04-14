<template>
  <section id="tournament-team-list">
    <b-table
      :data="teams.length ? teams : []"
      :mobile-cards="false"
      :row-class="() => 'is-wide'"
      hoverable
    >
      <template class="bubu" slot-scope="props">
        <b-table-column field="name" label="Name">
          {{ props.row.name }}
        </b-table-column>
        <b-table-column field="name" label="Action" numeric>
          <b-button
            type="is-danger"
            icon-right="trash"
            @click="remove(props.row.id)"
          />
        </b-table-column>
      </template>

      <template slot="empty">
        <section class="section">
          <div class="content has-text-grey has-text-centered">
            <p>
              <b-icon icon="users" pack="fas" />
            </p>
            <p>{{ $t("tournament.teams.list.empty") }}</p>
          </div>
        </section>
      </template>
    </b-table>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api"
import { Team } from "@/app/models/Team"
import { teams, removeTeam } from "@/app/effects/teams.effect"

export default defineComponent({
  setup(props, context) {
    const remove = (teamId: string) => {
      removeTeam(context.root.$route.params.id, teamId)
    }

    return {
      teams,
      remove,
    }
  },
})
</script>

<style lang="scss" scoped>
@import "src/styles/utilities/variables";

section {
  padding-top: $spacing-4;
  padding-bottom: $spacing-8;
}
</style>
