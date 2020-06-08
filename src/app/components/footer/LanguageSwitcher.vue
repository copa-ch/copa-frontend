<template>
  <v-select
    class="language-switcher"
    :items="$i18n.availableLocales"
    v-model="$i18n.locale"
    v-on:change="onLocaleChange($i18n.locale)"
  >
    <font-awesome-icon slot="prepend" icon="globe" />
  </v-select>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  setup() {
    const onLocaleChange = (locale: string) =>
      localStorage && localStorage.setItem('userLanguage', locale)

    return {
      onLocaleChange,
    }
  },
})
</script>

<style lang="scss" scoped>
.language-switcher {
  width: 80px;
}
</style>
