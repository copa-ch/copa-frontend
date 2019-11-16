<template>
  <footer class="footer" aria-label="footer">
    <div class="content">
      <div class="columns">
        <div class="column">
          <div class="level-left">
            <router-link class="level-item" :to="{ name: 'privacy' }">{{ $t('privacy.title') }}</router-link>
          </div>
        </div>
        <div class="column">
          <div class="level-right">
            <div class="level-item has-text-grey">{{$t('footer.app')}} {{ appVersion }}</div>
            <div v-if="isApiInformationLoaded" class="level-item has-text-grey">{{$t('footer.server')}} {{ apiInformation.version }}</div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { Getter, Action } from 'vuex-class';
  import { ApiInformation } from '@/app/models/ApiInformation';
  import { RequestState } from '@/app/models/States';
  import { ApiInformationStoreGetters } from '@/app/store/accessors';
  import { appConfig } from '@/config/app.config';

  @Component
  export default class Footer extends Vue {
    @Getter(ApiInformationStoreGetters.ApiInformation)
    apiInformation!: ApiInformation

    @Getter(ApiInformationStoreGetters.ApiInformationState)
    apiInformationState!: RequestState;

    appVersion = appConfig.version;

    get isApiInformationLoaded() {
      return this.apiInformationState === RequestState.SUCCESSFUL;
    }
  }
</script>
