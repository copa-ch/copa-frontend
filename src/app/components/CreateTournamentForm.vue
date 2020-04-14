<template>
  <section class="create-tournament-form has-text-left">
    <h1 class="title is-2 has-text-black">
      {{ $t("createTournament.title") }}
    </h1>
    <h2 class="subtitle is-4 has-text-black">
      {{ $t("createTournament.subtitle") }}
    </h2>

    <transition name="fade">
      <b-notification
        v-if="hasError"
        type="is-danger"
        aria-close-label="Close notification"
        role="alert"
      >
        {{ $t("createTournament.submitFailed") }}
      </b-notification>
    </transition>

    <TextInput
      icon="trophy"
      label="createTournament.name.label"
      placeholder="createTournament.name.placeholder"
      :state="nameState"
      :message="nameMessage"
      :loading="isPending"
      v-model="name"
    />

    <TextInput
      icon="user"
      label="createTournament.owner.label"
      placeholder="createTournament.owner.placeholder"
      :state="ownerState"
      :message="ownerMessage"
      :loading="isPending"
      v-model="owner"
    />

    <TextInput
      icon="envelope"
      label="createTournament.email.label"
      placeholder="createTournament.email.placeholder"
      :state="emailState"
      :message="emailMessage"
      :loading="isPending"
      v-model="email"
    />

    <br />

    <b-button
      class="create-tournament-submit-button"
      type="is-primary"
      :disabled="isPending"
      :loading="isPending"
      @click="submit"
    >
      {{ $t("createTournament.submitButton") }}
    </b-button>
  </section>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
  watch,
  Ref,
} from "@vue/composition-api"
import TextInput from "@/app/components/form/TextInput.vue"
import { useApiTournamentCreate } from "@/app/effects/tournament.api.effect"
import isEmail from "validator/lib/isEmail"
import isEmpty from "validator/lib/isEmpty"
import Spinner from "@/app/components/layout/Spinner.vue"

export default defineComponent({
  components: {
    TextInput,
    Spinner,
  },
  setup(props, { root }) {
    const isPristine = ref(true)
    const { name, nameState, nameMessage, isNameInvalid } = useNameInput(
      isPristine,
    )
    const { owner, ownerState, ownerMessage, isOwnerInvalid } = useOwnerInput(
      isPristine,
    )
    const { email, emailState, emailMessage, isEmailInvalid } = useEmailInput(
      isPristine,
    )
    const {
      isPending,
      hasError,
      createTournament,
      createdTournament,
    } = useApiTournamentCreate()

    const submit = async () => {
      isPristine.value = false
      if (
        !isNameInvalid.value &&
        !isOwnerInvalid.value &&
        !isEmailInvalid.value
      ) {
        await createTournament({
          name: name.value,
          owner: owner.value,
          email: email.value,
        })
        if (!hasError.value) {
          await root.$router.push({
            name: "tournament-teams",
            params: { id: createdTournament.value.adminId },
          })
        }
      }
    }

    return {
      isPending,
      submit,
      hasError,
      name,
      nameState,
      nameMessage,
      owner,
      ownerState,
      ownerMessage,
      email,
      emailState,
      emailMessage,
    }
  },
})

function useNameInput(isPristine: Ref<boolean>) {
  const name = ref("")
  const isNameInvalid = ref(false)
  const isNamePristine = ref(true)
  watch(name, () => (isNameInvalid.value = isEmpty(name.value)))
  return {
    nameState: computed(() =>
      isPristine.value ? "" : isNameInvalid.value ? "is-danger" : "is-success",
    ),
    nameMessage: computed(() =>
      isNameInvalid.value && !isPristine.value
        ? "createTournament.name.message"
        : "",
    ),
    name,
    isNameInvalid,
    isNamePristine,
  }
}

function useOwnerInput(isPristine: Ref<boolean>) {
  const owner = ref("")
  const isOwnerInvalid = ref(false)
  const isOwnerPristine = ref(true)
  watch(owner, () => (isOwnerInvalid.value = isEmpty(owner.value)))
  return {
    ownerState: computed(() =>
      isPristine.value ? "" : isOwnerInvalid.value ? "is-danger" : "is-success",
    ),
    ownerMessage: computed(() =>
      isOwnerInvalid.value && !isPristine.value
        ? "createTournament.owner.message"
        : "",
    ),
    owner,
    isOwnerInvalid,
    isOwnerPristine,
  }
}

function useEmailInput(isPristine: Ref<boolean>) {
  const email = ref("")
  const isEmailInvalid = ref(false)
  const isEmailPristine = ref(true)
  watch(email, () => (isEmailInvalid.value = !isEmail(email.value)))
  return {
    emailState: computed(() =>
      isPristine.value ? "" : isEmailInvalid.value ? "is-danger" : "is-success",
    ),
    emailMessage: computed(() =>
      isEmailInvalid.value && !isPristine.value
        ? "createTournament.email.message"
        : "",
    ),
    email,
    isEmailInvalid,
    isEmailPristine,
  }
}
</script>

<style lang="scss" scoped>
@import "src/styles/utilities/all";

.copa-field {
  min-height: 105px;
}

@include mobile() {
  button.create-tournament-submit-button {
    display: flex;
    width: 100%;
  }
}
</style>
