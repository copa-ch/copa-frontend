<template>
  <section id="home">
    <Header></Header>
    <section class="hero is-dark is-fullheight-with-navbar">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title animated"
              v-html="$t('home.title')"
              :class="{
                'is-hidden': isBannerGone,
                fadeInDown: !isCreateDialogOpen,
                fadeOutUp: isCreateDialogOpen,
              }"></h1>
          <h1 class="subtitle is-5 animated"
              v-html="$t('home.subtitle')"
              :class="{
              'is-hidden': isBannerGone,
              fadeInDown: !isCreateDialogOpen,
              fadeOutUp: isCreateDialogOpen,
            }"></h1>
          <h1 class="subtitle is-1 animated"
              v-html="$t('home.beta')"
              :class="{
                'is-hidden': isBannerGone,
                fadeInDown: !isCreateDialogOpen,
                fadeOutUp: isCreateDialogOpen,
              }"></h1>
          <b-button @click="() => openCreateDialog()"
                    class="animated"
                    type="is-dark"
                    size="is-medium"
                    rounded inverted
                    :class="{
                      'is-hidden': isBannerGone,
                      fadeInDown: !isCreateDialogOpen,
                      fadeOutUp: isCreateDialogOpen,
            }">
            Let's start
          </b-button>
          <section class="box animated delay-1 hidden" :class="{
            'is-hidden': !isBannerGone,
            fadeInUp: isBannerGone
          }">
            <CreateTournamentForm></CreateTournamentForm>
          </section>
        </div>
      </div>
    </section>
    <Footer></Footer>
  </section>
</template>

<script lang="ts">
  import {defineComponent, ref} from '@vue/composition-api'
  import Header from '@/app/components/layout/Header.vue'
  import Footer from '@/app/components/layout/Footer.vue'
  import CreateTournamentForm from '@/app/components/CreateTournamentForm.vue'

  export default defineComponent({
    components: {
      Header,
      Footer,
      CreateTournamentForm,
    },
    setup() {
      const isCreateDialogOpen = ref(false)
      const isBannerGone = ref(false)

      const openCreateDialog = () => {
        isCreateDialogOpen.value = true
        setTimeout(() => isBannerGone.value = true, 500)
      }

      return {
        openCreateDialog,
        isCreateDialogOpen,
        isBannerGone,
      }
    },
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/utilities/variables';
  @import '~bulma/sass/utilities/all';

  $margin-outside: 180px;

  section.hero {
    background-image: url('../../assets/background.svg');
    background-position: right center;
    background-repeat: no-repeat;
    background-size: cover;

    .container {
      > .title {
        font-size: 2rem;
        margin: 0 5px 30px 5px;
      }

      > .subtitle {
        font-size: 1rem;
        margin: 15px 5px;
      }

      > .button {
        margin: 15px;
        padding-left: 50px;
        padding-right: 50px;
      }
    }

    @include tablet() {
      background-position: center center;

      .container {
        > .title {
          font-size: 4rem;
          margin: 0 15px 60px 15px;
        }

        > .subtitle {
          font-size: 1.2rem;
          margin: 30px 15px;
        }

        > .button {
          margin: 30px;
          padding-left: 50px;
          padding-right: 50px;
        }
      }
    }

  }

</style>
