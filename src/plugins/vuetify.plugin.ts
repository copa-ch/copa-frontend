import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// import en from 'vuetify/src/locale/en'
// import de from 'vuetify/src/locale/de'

Vue.use(Vuetify)

export const vuetify = new Vuetify({
  // lang: {
  //   locales: { de, en },
  //   current: 'de',
  // },
  theme: {
    themes: {
      light: {
        primary: '#5F3DC4',
        secondary: '#FFC107',
        accent: '#22B8CF',
        error: '#FF3860',
        info: '#5c7cfa',
        success: '#20c997',
        warning: '#FCC419',
      },
    },
  },
  icons: {
    iconfont: 'faSvg',
    values: {
      trophy: {
        component: FontAwesomeIcon,
        props: {
          icon: ['fas', 'trophy'],
        },
      },
      teams: {
        component: FontAwesomeIcon,
        props: {
          icon: ['fas', 'users'],
        },
      },
      games: {
        component: FontAwesomeIcon,
        props: {
          icon: ['fas', 'trophy'],
        },
      },
      ranking: {
        component: FontAwesomeIcon,
        props: {
          icon: ['fas', 'table'],
        },
      },
      settings: {
        component: FontAwesomeIcon,
        props: {
          icon: ['fas', 'cog'],
        },
      },
    },
  },
})
