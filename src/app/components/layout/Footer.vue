<template>
  <footer class="footer">
    <div class="content has-text-centered">
      <p>
        <strong>COPA</strong>
        by Gery Hirschfeld & Robert Kleger.
        <br>The source code is licensed
        <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.
      </p>
      <p>
        App Version {{appVersion}}, API Version {{apiVersion}}
      </p>
    </div>
  </footer>
</template>

<script lang="ts">
  import {defineComponent} from '@vue/composition-api'
  import {useAppConfig} from '@/app/effects/config.effect'
  import {useApiInformation} from '@/app/effects/meta.api.effect'

  export default defineComponent({
    setup() {
      const appConfig = useAppConfig()
      const {isPending, apiVersion, getApiInformation} = useApiInformation()

      getApiInformation()

      return {
        isPending,
        apiVersion,
        appVersion: appConfig.version,
      }
    },
  })
</script>

<style lang="scss">
  @import 'src/styles/utilities/variables';

  footer.footer {
    position: relative;

    &:before {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      height: 8px;
      width: 100%;
      background: linear-gradient(45deg, $dark, $light);
    }
  }

</style>
