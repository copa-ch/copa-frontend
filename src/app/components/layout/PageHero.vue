<template>
  <section class="hero is-dark">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">{{$t(title)}}</h1>
      </div>
    </div>
    <div class="hero-foot">
      <nav class="tabs is-boxed is-fullwidth">
        <div class="container">
          <ul>
            <li v-for="child in children" :key="child.name">
              <router-link
                class="navbar-item"
                :to="{ name: child.name }"
                exact-active-class="is-active"
              >{{$t(child.meta.title)}}</router-link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import { RouteConfig } from 'vue-router'

export default defineComponent({
  props: {
    title: String,
    routeName: String,
  },
  setup(props, context) {
    let route

    if (context.parent) {
      // this is a workaround until new vue router with TS options support is released.
      // https://github.com/vuejs/vue-router/pull/2085
      const router: any = context.parent.$router;
      route = router.options.routes.find((route: RouteConfig) => route.name === props.routeName);
    }

    const children = route && route.children ? route.children : [];

    return {
      children,
    }
  },
})
</script>

<style lang="scss" scoped>
section.hero {
  background-image: url("../../../assets/hero.svg");
  background-position: right center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
