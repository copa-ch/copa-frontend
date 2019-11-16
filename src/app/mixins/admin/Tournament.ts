import { Component, Vue } from 'vue-property-decorator'

@Component
export default class TournamentMixin extends Vue {
  get hash() {
    return this.$route.params.id
  }
}
