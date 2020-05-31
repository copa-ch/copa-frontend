<template>
  <section class="home-page">
    <Heading size="large">{{ $t('home.create.title') }}</Heading>
    <v-form v-model="validModel">
      <v-alert v-if="hasFailed" type="error">{{
        $t('home.create.submitFailed')
      }}</v-alert>
      <p class="body-1">{{ $t('home.create.name.label') }}</p>
      <v-text-field
        autofocus
        v-model="nameModel"
        :label="$t('home.create.name.placeholder')"
        :loading="isPending"
        :rules="[rules.isRequired]"
        maxlength="45"
        :counter="45"
        filled
      ></v-text-field>

      <p class="body-1">{{ $t('home.create.owner.label') }}</p>
      <v-text-field
        v-model="ownerModel"
        :label="$t('home.create.owner.placeholder')"
        :loading="isPending"
        :rules="[rules.isRequired]"
        maxlength="45"
        :counter="45"
        filled
      ></v-text-field>

      <p class="body-1">{{ $t('home.create.email.label') }}</p>
      <v-text-field
        v-model="emailModel"
        :label="$t('home.create.email.placeholder')"
        :loading="isPending"
        :rules="[rules.isRequired, rules.isEmail]"
        filled
      ></v-text-field>
    </v-form>

    <br />

    <v-btn
      color="primary"
      x-large
      :disabled="!validModel || isPending"
      @click="submit()"
    >
      {{ $t('home.create.submitButton') }}
    </v-btn>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import Heading from '../components/Heading.vue'
import isEmpty from 'validator/es/lib/isEmpty'
import isEmail from 'validator/es/lib/isEmail'
import { useTournament } from '../reactive/tournament.state'
import { API } from '../api'

export default defineComponent({
  components: {
    Heading,
  },
  setup(props, { root }) {
    const hasFailed = ref(false)
    const isPending = ref(false)
    const validModel = ref(false)
    const nameModel = ref<string>('')
    const ownerModel = ref<string>('')
    const emailModel = ref<string>('')
    const { setTournament } = useTournament()

    const submit = async () => {
      hasFailed.value = false
      const response = await API.Tournament.create({
        name: nameModel.value,
        owner: ownerModel.value,
        email: emailModel.value,
      })
      if (response.isSuccessful && response.data) {
        setTournament(response.data)
        await root.$router.push({
          name: 'tournament.teams',
          params: { id: response.data.adminId },
        })
      } else {
        hasFailed.value = true
      }
    }

    return {
      isPending,
      hasFailed,
      validModel,
      nameModel,
      ownerModel,
      emailModel,
      submit,
      rules: {
        isRequired: (value: string) =>
          !isEmpty(value) || root.$i18n.t('common.form.required'),
        isEmail: (value: string) =>
          isEmail(value) || root.$i18n.t('common.form.email'),
      },
    }
  },
})
</script>

<style lang="scss"></style>
