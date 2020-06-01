<template>
  <v-card flat outlined>
    <v-card-title>List of the participants</v-card-title>
    <v-card-subtitle>List of the participants</v-card-subtitle>
    <v-card-actions>
      <v-skeleton-loader
        v-if="isLoading"
        type="list-item-avatar, divider, list-item-avatar, divider, list-item-avatar"
      ></v-skeleton-loader>

      <div class="no-data" v-if="!isLoading && teams.length === 0">
        <font-awesome-icon icon="users" />
        <h3 class="title">No teams yet</h3>
        <p class="body-1">Add teams to start your tournament</p>
      </div>

      <v-list v-if="!isLoading" style="width: 100%;">
        <template v-for="(team, index) in teams">
          <TeamItem
            :key="team.name"
            :team="team"
            :index="index"
            @removed="teamIndex => removed(teamIndex)"
          />
          <v-divider v-if="index + 1 < teams.length" :key="index"></v-divider>
        </template>
      </v-list>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import TeamItem from './TeamItem.vue'

export default defineComponent({
  components: {
    TeamItem,
  },
  props: {
    teams: {
      type: Array,
      default: [],
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    function removed(teamIndex: number) {
      console.log('team list removed', teamIndex)
      emit('removed', teamIndex)
    }
    return { removed }
  },
})
</script>

<style lang="scss">
@import '../../../scss/variables.scss';

.v-skeleton-loader__list-item-avatar {
  height: 60px;
}

.no-data {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  svg {
    width: 80px !important;
    height: 80px !important;
  }

  h3,
  p {
    color: $c-grey;
    margin-top: 8px;
  }
  path {
    fill: $c-grey;
  }
}
</style>
