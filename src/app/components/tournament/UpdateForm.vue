<template>
  <v-card outlined flat>
    <v-card-title class="title">{{ $t('settings.update.title') }}</v-card-title>
    <v-card-text>
      <v-form v-model="validModel" style="max-width: 500px;">
        <v-text-field
          v-model="nameModel"
          :label="$t('settings.update.name.label')"
          :loading="isPending"
          :rules="[rules.isRequired]"
          maxlength="45"
          :counter="45"
          filled
        ></v-text-field>

        <v-text-field
          v-model="ownerModel"
          :label="$t('settings.update.owner.label')"
          :loading="isPending"
          :rules="[rules.isRequired]"
          maxlength="45"
          :counter="45"
          filled
        ></v-text-field>

        <v-btn
          color="primary"
          :disabled="!validModel || isPending"
          @click="submit()"
        >
          {{ $t('common.save') }}
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import { useTournament } from '../../reactive/tournament.state'
import isEmpty from 'validator/es/lib/isEmpty'
import { API } from '../../api'

export default defineComponent({
  setup(props, { root }) {
    const { setTournament, tournament } = useTournament()

    const hasFailed = ref(false)
    const isPending = ref(false)
    const validModel = ref(false)
    const nameModel = ref<string>(tournament.name)
    const ownerModel = ref<string>(tournament.owner)

    async function submit() {
      isPending.value = true
      hasFailed.value = false
      const response = await API.Tournament.update(root.$route.params.hash, {
        name: nameModel.value,
        owner: ownerModel.value,
        state: tournament.state,
      })
      if (response.isSuccessful && response.data) {
        setTournament(response.data)
      } else {
        hasFailed.value = true
      }
      isPending.value = false
    }

    return {
      isPending,
      hasFailed,
      validModel,
      nameModel,
      ownerModel,
      submit,
      rules: {
        isRequired: (value: string) =>
          !isEmpty(value) || root.$i18n.t('common.form.required'),
      },
    }
  },
})
</script>

<style lang="scss"></style>
