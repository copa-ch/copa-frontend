/* ============
 * Main File
 * ============
 *
 * Will initialize the application.
 */

import 'reflect-metadata'
import Vue from 'vue'
import './scss/styles.scss'
import { appConfig } from '@/config/app.config'

/* ============
 * Plugins
 * ============
 *
 * Import and bootstrap the plugins.
 * The order is important!
 */
import '@/plugins/logdown.plugin'
import '@/plugins/fontawesome.plugin'
import '@/plugins/axios.plugin'
import '@/plugins/vue-composition-api.plugin'
import '@/plugins/v-clipboard.plugin'
import { i18n } from '@/plugins/i18n.plugin'
import { router } from '@/plugins/vue-router.plugin'
import { vuetify } from '@/plugins/vuetify.plugin'

/* ============
 * Main App
 * ============
 *
 * Last but not least, we import the main application.
 */
import App from './app/App.vue'
import './registerServiceWorker'

Vue.config.productionTip = false

new Vue({
  i18n,
  router,
  vuetify,
  render: h => h(App),
}).$mount('#app')

const log = Vue.$createLogger('main')
log.info(`The environment is ${appConfig.env}.`)
log.info(`The version is ${appConfig.version}.`)
log.info(`The language is set to ${i18n.locale}.`)
