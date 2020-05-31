<template>
  <section>
    <v-container>
      <Heading size="small" padded>{{ $t('settings.title') }}</Heading>
      <p class="body-1">{{ $t('settings.description') }}</p>
      <br />
      <UpdateForm />
      <br />
      <br />
      <DeleteForm />
      <br />
    </v-container>
  </section>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import Heading from '../components/Heading.vue'
import UpdateForm from '../components/tournament/UpdateForm.vue'
import DeleteForm from '../components/tournament/DeleteForm.vue'

export default defineComponent({
  components: { Heading, UpdateForm, DeleteForm },
  setup() {
    return {}
  },
})
</script>

<style lang="scss"></style>
