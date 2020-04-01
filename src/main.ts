/* ============
 * Main File
 * ============
 *
 * Will initialize the application.
 */

import Vue from "vue"
import "./styles/styles.scss"
import { appConfig } from "@/config/app.config"

/* ============
 * Plugins
 * ============
 *
 * Import and bootstrap the plugins.
 * The order is important!
 */
import "@/plugins/logdown.plugin"
import "@/plugins/fontawesome.plugin"
import "@/plugins/buefy.plugin"
import "@/plugins/axios.plugin"
import "@/plugins/clipboard.plugin"
import "@/plugins/vue-composition-api.plugin"
import { i18n } from "@/plugins/i18n.plugin"
import { router } from "@/plugins/vue-router.plugin"

/* ============
 * Main App
 * ============
 *
 * Last but not least, we import the main application.
 */
import App from "./app/App.vue"
import "./registerServiceWorker"

Vue.config.productionTip = false

new Vue({
  i18n,
  router,
  render: (h) => h(App),
}).$mount("#app")

const log = Vue.$createLogger("main")
log.info(`The environment is ${appConfig.env}.`)
log.info(`The version is ${appConfig.version}.`)
log.info(`The language is set to ${i18n.locale}.`)
