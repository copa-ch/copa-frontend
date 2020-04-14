<template>
  <section id="tournament-add-team">
    <transition name="fade">
      <b-notification
        v-if="isFailed"
        type="is-danger"
        aria-close-label="Close notification"
        role="alert"
      >
        {{ $t("createTournament.submitFailed") }}
      </b-notification>
    </transition>

    <div class="field has-addons">
      <div class="control is-expanded">
        <TextInput
          icon="users"
          label="tournament.teams.add.label"
          placeholder="tournament.teams.add.placeholder"
          :state="teamNameState"
          :message="teamNameMessage"
          :loading="isPending"
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
import {
  defineComponent,
  ref,
  Ref,
  watch,
  computed,
} from "@vue/composition-api"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import isEmpty from "validator/lib/isEmpty"
import { addTeam, isPending, isFailed } from "@/app/effects/teams.effect"
import TextInput from "@/app/components/form/TextInput.vue"

export default defineComponent({
  components: {
    FontAwesomeIcon,
    TextInput,
  },
  setup(props, context) {
    const isPristine = ref(true)

    const {
      teamName,
      teamNameState,
      teamNameMessage,
      isTeamNameInvalid,
    } = useTeamNameInput(isPristine)

    const submit = async () => {
      isPristine.value = false

      if (!isTeamNameInvalid.value) {
        await addTeam(context.root.$route.params.id, teamName.value)

        if (!isFailed.value) {
          isPristine.value = true
          teamName.value = ""
        }
      }
    }

    return {
      teamName,
      isPending,
      isFailed,
      teamNameState,
      teamNameMessage,
      submit,
    }
  },
})

function useTeamNameInput(isPristine: Ref<boolean>) {
  const teamName = ref("")
  const isTeamNameInvalid = ref(false)
  const isTeamNamePristine = ref(true)

  watch(teamName, () => (isTeamNameInvalid.value = isEmpty(teamName.value)))

  return {
    teamNameState: computed(() =>
      isPristine.value
        ? ""
        : isTeamNameInvalid.value || isFailed.value
        ? "is-danger"
        : "is-success",
    ),
    teamNameMessage: computed(() =>
      isTeamNameInvalid.value && !isPristine.value
        ? "tournament.teams.add.messages.empty"
        : "",
    ),
    teamName,
    isTeamNameInvalid,
    isTeamNamePristine,
  }
}
</script>

<style lang="scss" scoped>
@import "src/styles/utilities/variables";

section {
  padding-top: $spacing-8;
  padding-bottom: $spacing-4;
}

.control {
  align-self: flex-end;
}
</style>
