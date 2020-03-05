<template>
  <section id="tournament-add-team">
    <div class="field has-addons">
      <div class="control is-expanded">
        <input
          class="input"
          type="text"
          :placeholder="$t('tournament.teams.add.placeholder')"
          v-on:keyup.enter="submit()"
          v-model="teamName"
        />
      </div>
      <div class="control">
        <a class="button is-info" @click="submit()">
          <font-awesome-icon icon="plus" />
        </a>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from '@vue/composition-api'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { addTeam } from '@/app/effects/teams.effect'

export default defineComponent({
  components: {
    FontAwesomeIcon,
  },
  setup(props, context) {
    const teamName = ref('')

    const submit = async () => {
      await addTeam(context.root.$route.params.id, teamName.value)
      teamName.value = ''
    }

    return {
      teamName,
      submit,
    }
  },
})
</script>

<style lang="scss" scoped>
@import "../../../styles/variables.scss";

section {
  padding-top: $spacing-8;
  padding-bottom: $spacing-4;
}
</style>
