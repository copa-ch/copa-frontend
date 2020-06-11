/* ============
 * Vue i18n
 * ============
 *
 * Internationalization plugin of Vue.js.
 *
 * https://kazupon.github.io/vue-i18n/
 */

import Vue from 'vue'
import VueI18n from 'vue-i18n'

import de from '@/i18n/de'
import en from '@/i18n/en'

Vue.use(VueI18n)

const savedLanguage = localStorage && localStorage.getItem('userLanguage');

export const i18n = new VueI18n({
  locale: savedLanguage || 'en',
  fallbackLocale: 'en',
  silentTranslationWarn: true,
  messages: { de, en },
})
