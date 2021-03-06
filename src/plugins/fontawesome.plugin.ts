import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faCheckCircle,
  faInfoCircle,
  faExclamation,
  faExclamationTriangle,
  faTrophy,
  faUsers,
  faCog,
  faBasketballBall,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
  faCheckCircle,
  faInfoCircle,
  faExclamation,
  faExclamationTriangle,
  faTrophy,
  faUsers,
  faCog,
  faBasketballBall,
)

Vue.component('font-awesome-icon', FontAwesomeIcon)
