<template>
  <div class="field copa-field" :class="loading ? 'is-loading' : ''">
    <label v-if="label" class="label">{{ $t(label) }}</label>
    <p
      :class="`control ${hasIconLeft ? 'has-icons-left' : ''} has-icons-right`"
    >
      <input
        class="input"
        :class="state"
        :type="type"
        :disabled="disabled || loading"
        :readonly="loading"
        :maxlength="maxlength"
        :placeholder="$t(placeholder)"
        :value="modelValue"
        @input="onInput"
        v-on="inputListeners"
      />
      <b-icon v-if="icon" class="is-left" :icon="icon" :pack="'fas'" />
      <transition name="slide">
        <b-icon
          v-if="hasIconRight && !loading"
          class="is-right"
          :class="iconRightClass"
          :icon="iconRight"
          :pack="'fas'"
        />
      </transition>
    </p>
    <transition name="slide">
      <p v-if="message" class="help" :class="iconRightClass">
        {{ $t(message) }}
      </p>
    </transition>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from '@vue/composition-api'

export default defineComponent({
  props: {
    value: [Number, String],
    label: String,
    type: {
      type: String,
      default: 'text',
    },
    state: String,
    message: String,
    icon: String,
    placeholder: String,
    maxlength: Number,
    loading: Boolean,
    disabled: Boolean,
  },
  setup(props, { emit, listeners }) {
    const modelValue = ref(props.value)

    watch(
      () => props.value,
      (changedValue: any) => (modelValue.value = changedValue),
    )

    const onInput = (event: any) => {
      modelValue.value = event.target.value
      emit('input', modelValue.value)
    }

    const inputListeners = computed(() => ({
      ...listeners,
      input: onInput,
    }))

    return {
      modelValue,
      onInput,
      inputListeners,
      hasIconLeft: computed(() => !!props.icon),
      hasIconRight: computed(() => !!props.state || !!props.loading),
      iconRight: computed(() => {
        if (props.loading) {
          return ''
        }
        if (props.state) {
          if (props.state === 'is-success') {
            return 'check'
          } else if (props.state === 'is-danger') {
            return 'exclamation'
          } else if (props.state === 'is-warning') {
            return 'exclamation-triangle'
          }
        }
        return ''
      }),
      iconRightClass: computed(() => {
        if (props.state) {
          return `has-text-${props.state.substring(3)}`
        }
        return ''
      }),
    }
  },
})
</script>

<style lang="scss">
@import 'src/styles/utilities/all';

.copa-field {
  position: relative;

  &:not(:last-child) {
    margin-bottom: 1rem;
  }

  input {
    border-left: none;
    border-right: none;
    border-top: none;
    border-bottom-width: 2px;
    border-radius: 4px 4px 0 0;
    outline: none !important;
    box-shadow: none !important;
  }

  &.is-loading input {
    background: linear-gradient(-45deg, $white-ter 40%, $white, $white-ter 60%);
    background-size: 300% 350%;
    animation: loading 2s infinite linear;
    animation-delay: 0s;
    border-color: $grey-lightest !important;
  }

  &:not(.is-loading) input:disabled {
    background: $white-bis;
  }

  &.is-loading .is-right {
    animation: rotating 2s linear infinite;
    color: $purple;
  }

  .control {
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      height: 0;
      width: 0;
      left: 50%;
      transition: left 0.3s, width 0.3s, height 0.3s;
      background: linear-gradient(45deg, $purple, $turquoise);
    }
  }

  &:focus-within {
    .control::after {
      height: 2px;
      left: 0;
      width: 100%;
    }
  }
}
</style>
