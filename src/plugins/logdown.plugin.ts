/* ============
 * Logdown
 * ============
 *
 * Lightweight, unobtrusive, configurable JavaScript logger.
 *
 * https://caiogondim.github.io/logdown.js/
 */

import Vue from 'vue'
import { PluginObject } from 'vue'
import logdown from 'logdown'
import { appConfig } from '@/config/app.config'

export const Logger: PluginObject<any> = {
  install(VueInstance, options) {
    const PREFIX = 'app'

    const defaultOptions = {
      markdown: true,
      isEnabled: appConfig.logEnabled,
    }

    window.localStorage.debug = appConfig.logEnabled ? `${PREFIX}:*` : 'none'

    const logdownOptions = Object.assign({}, defaultOptions, options)
    const createLogger = (prefix: string) => logdown(`${PREFIX}:${prefix}`, logdownOptions)

    VueInstance.$createLogger = createLogger

    VueInstance.prototype.$createLogger = createLogger
  },
}

Vue.use(Logger)
