<template>
  <v-form ref="formRef" v-model="valid" novalidate>
    <v-row v-if="isLoading" style="height: 110px">
      <v-col cols="12" sm="8" lg="6">
        <v-skeleton-loader height="56" type="image"></v-skeleton-loader>
      </v-col>
      <v-col cols="12" sm="4" lg="6">
        <v-skeleton-loader
          height="56"
          width="112"
          type="image"
        ></v-skeleton-loader>
      </v-col>
    </v-row>

    <v-row v-if="!isLoading">
      <v-col>
        <v-text-field
          v-model="teamNameModel"
          :label="$t('teams.add.label')"
          :loading="isSubmitting"
          :rules="[rules.isRequired]"
          maxlength="45"
          :counter="45"
          filled
          @keypress.enter.native="submit($event)"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="auto">
        <v-btn
          color="primary"
          height="56"
          :loading="isSubmitting"
          :disabled="isSubmitting || !valid"
          @click="submit($event)"
        >
          {{ $t('teams.add.submit') }}
        </v-btn>
      </v-col>
    </v-row>

    <v-snackbar v-model="snackbar" bottom color="error">
      {{ $t('teams.add.failed') }}
      <v-btn dark text @click="snackbar = false">
        {{ $t('common.close') }}
      </v-btn>
    </v-snackbar>
  </v-form>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import isEmpty from 'validator/es/lib/isEmpty'
import { API } from '../../api'

export default defineComponent({
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { root, emit }) {
    const teamNameModel = ref<string>('')
    const valid = ref(false)
    const snackbar = ref(false)
    const isSubmitting = ref(false)
    const formRef = ref<any>()

    async function submit(event: Event) {
      event.preventDefault()
      event.stopPropagation()
      isSubmitting.value = true
      const response = await API.Tournament.addTeam(root.$route.params.hash, {
        name: teamNameModel.value,
      })
      if (response.isSuccessful) {
        teamNameModel.value = ''
        emit('input', response.data)
        formRef.value.resetValidation()
      } else {
        snackbar.value = true
      }
      isSubmitting.value = false
    }

    return {
      formRef,
      snackbar,
      valid,
      teamNameModel,
      isSubmitting,
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
