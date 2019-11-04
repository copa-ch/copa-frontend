<template>
  <section id="config-admin" class="container padded-container">
    <h1 class="title">{{ $t('admin.settings.title') }}</h1>
    <h1 class="subtitle">{{ $t('admin.settings.subtitle') }}</h1>
    <TournamentOptionsForm></TournamentOptionsForm>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import TournamentAdminTabs from '@/app/components/admin/TournamentAdminTabs.vue'
import { Events } from '@/app/constants/events'
import TournamentOptionsForm from '@/app/components/forms/TournamentOptionsForm.vue'
import { Action } from 'vuex-class'
import { AdminTabStoreActions } from '@/app/store/accessors'
import { AdminTabs } from '@/app/constants/tabs'

@Component({
  components: {
    TournamentOptionsForm,
    TournamentAdminTabs,
  },
})
export default class TournamentAdminSettings extends Vue {
  @Action(AdminTabStoreActions.ActivateTab)
  activateTab!: (tab: AdminTabs) => Promise<void>

  mounted() {
    this.activateTab(AdminTabs.Settings)
  }
}
</script>

<style lang="scss" scoped></style>
