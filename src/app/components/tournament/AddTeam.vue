<template>
  <section id="tournament-add-team">
    <div class="field has-addons">
      <div class="control is-expanded">
        <input class="input" type="text" :placeholder="$t('tournament.teams.add.placeholder')" />
      </div>
      <div class="control">
        <a class="button is-info">
          <font-awesome-icon icon="plus" />
        </a>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default defineComponent({
  components: {
    FontAwesomeIcon,
  },
  setup() {

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
