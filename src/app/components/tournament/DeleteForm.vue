<template>
  <v-card outlined flat style="border-color: #ff3860;">
    <v-card-title class="title">{{ $t('settings.delete.title') }}</v-card-title>
    <v-card-text>{{ $t('settings.delete.description') }}</v-card-text>
    <v-card-text>
      <v-btn color="error" @click="submit()">{{ $t('common.delete') }}</v-btn>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import { useTournament } from '../../reactive/tournament.state'
import { API } from '../../api'

export default defineComponent({
  setup(props, { root }) {
    const { clearTournament } = useTournament()

    const hasFailed = ref(false)
    const isPending = ref(false)

    async function submit() {
      isPending.value = true
      hasFailed.value = false
      const response = await API.Tournament.destroy(root.$route.params.hash)
      if (response.isSuccessful) {
        clearTournament()
        root.$router.replace({ name: 'home.index' })
      } else {
        hasFailed.value = true
      }
    }

    return {
      isPending,
      hasFailed,
      submit,
    }
  },
})
</script>

<style lang="scss"></style>
