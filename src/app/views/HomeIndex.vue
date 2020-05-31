<template>
  <section class="home-page">
    <Heading size="large">Create Amazing Tournaments</Heading>
    <p class="body-1">
      Get started today for free A better way to manage your own tournament
      Invite your participants, generate your schedule and much more
    </p>
    <p class="body-1">
      This app is still under development. So data will not be persisted
      permanently.
    </p>
    <br />
    <br />
    <v-btn color="primary" x-large @click="goToCreateForm">Let's start</v-btn>
  </section>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import Heading from '../components/Heading.vue'

export default defineComponent({
  components: {
    Heading,
  },
  setup(props, { root }) {
    return {
      goToCreateForm: () => root.$router.push({ name: 'home.create' }),
    }
  },
})
</script>

<style lang="scss"></style>
