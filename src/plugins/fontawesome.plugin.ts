import Vue from "vue"
import { library } from "@fortawesome/fontawesome-svg-core"
import {
  faCheck,
  faUser,
  faTrophy,
  faEnvelope,
  faLink,
  faExclamationCircle,
  faCogs,
  faUsers,
  faTrash,
  faPlus,
  faSave,
  faNetworkWired,
  faHardHat,
  faListOl,
  faExclamationTriangle,
  faExclamation,
  faVolleyballBall,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

library.add(
  faUser,
  faTrophy,
  faEnvelope,
  faLink,
  faExclamationCircle,
  faExclamation,
  faCheck,
  faCogs,
  faUsers,
  faTrash,
  faPlus,
  faSave,
  faNetworkWired,
  faHardHat,
  faListOl,
  faExclamationTriangle,
  faVolleyballBall,
)

Vue.component("font-awesome-icon", FontAwesomeIcon)
