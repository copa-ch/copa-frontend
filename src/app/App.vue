<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
  import { Action } from 'vuex-class';
  import { Vue, Component } from 'vue-property-decorator';
  import { ApiInformationStoreActions } from '@/app/store/accessors';

  @Component
  export default class App extends Vue {
    @Action(ApiInformationStoreActions.Load)
    loadApiInformation!: () => Promise<void>;

    mounted() {
      this.loadApiInformation();
    }
  }
</script>
