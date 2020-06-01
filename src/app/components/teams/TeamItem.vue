<template>
  <v-list-item>
    <v-list-item-avatar :color="avatarColor(team.name)">
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
import avatarColors from '../../../scss/avatar-colors.scss'

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

    function avatarColor(name: string): string {
      let sum = 0

      for (let index = 0; index < name.length; index++) {
        sum += name.charCodeAt(index)
      }

      const avatarColorsKeyLength = Object.keys(avatarColors).length
      const colorKey = Object.keys(avatarColors)[sum % avatarColorsKeyLength]

      return avatarColors[colorKey]
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

    return { initials, isRemoving, remove, avatarColor }
  },
})
</script>

<style lang="scss"></style>
