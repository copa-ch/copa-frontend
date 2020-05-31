<template>
  <v-list-item>
    <v-list-item-avatar>
      {{ initials(team.name) }}
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title>{{ team.name }}</v-list-item-title>
    </v-list-item-content>
    <v-list-item-action>
      <v-btn text color="primary" v-if="!isRemoving" @click="remove(team)">{{
        $t('common.delete')
      }}</v-btn>
      <v-progress-circular
        v-if="isRemoving"
        :size="36"
        indeterminate
        color="primary"
      ></v-progress-circular>
    </v-list-item-action>
  </v-list-item>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import { TeamDto } from '../../dto/team.dto'
import { API } from '../../api'

export default defineComponent({
  props: {
    index: Number,
    team: {
      type: Object,
      default: {},
    },
  },
  setup(props, { root, emit }) {
    const isRemoving = ref(false)

    function initials(name: string): string {
      return name
        .split(/[\s, ,-]+/)
        .map(w => w[0].toUpperCase())
        .join('')
        .substring(0, 2)
    }

    async function remove(team: TeamDto) {
      const response = await API.Tournament.removeTeam(
        root.$route.params.hash,
        team.id,
      )
      if (response.isSuccessful) {
        console.log('trigger removed event')
        emit('removed', props.index)
      }
      isRemoving.value = false
    }

    return { initials, isRemoving, remove }
  },
})
</script>

<style lang="scss"></style>
