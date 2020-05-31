<template>
  <section class="d-flex justify-center" style="width: 100%;">
    <v-card max-width="420" style="margin-top: 12px; width: 100%;">
      <v-card-title class="headline">
        {{ $t('tournament.invitation.title') }}
      </v-card-title>
      <v-card-subtitle>
        {{ $t('tournament.invitation.subtitle') }}
      </v-card-subtitle>
      <v-card-text>
        <v-text-field v-model="shareUrl" filled readonly></v-text-field>
      </v-card-text>
      <v-card-text style="margin-top: -35px;">
        <v-btn
          color="primary"
          v-clipboard="() => shareUrl"
          v-clipboard:success="clipboardSuccessHandler"
        >
          {{ $t('common.copy') }}
        </v-btn>
        <v-btn color="primary" text @click="close()">
          {{ $t('common.close') }}
        </v-btn>
      </v-card-text>
    </v-card>

    <v-snackbar v-model="copySnackbar" top color="success">
      {{ $t('tournament.invitation.snackbar') }}
      <v-btn dark text @click="copySnackbar = false">
        {{ $t('common.close') }}
      </v-btn>
    </v-snackbar>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from '@vue/composition-api'

export default defineComponent({
  props: {
    visitorId: {
      type: String,
      default: '',
    },
  },
  setup(props, { emit }) {
    const copySnackbar = ref(false)

    const shareUrl = computed(
      () => `${location.origin}/tournament/${props.visitorId}`,
    )

    function clipboardSuccessHandler() {
      copySnackbar.value = true
    }

    function close() {
      copySnackbar.value = false
      emit('close')
    }

    return {
      close,
      shareUrl,
      clipboardSuccessHandler,
      copySnackbar,
    }
  },
})
</script>

<style lang="scss"></style>
