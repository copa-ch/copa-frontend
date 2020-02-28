import {ref} from '@vue/composition-api'
import {appConfig} from '@/config/app.config'

export const useAppConfig = () => {
  const version = ref(appConfig.version)
  return {
    version,
  }
}
