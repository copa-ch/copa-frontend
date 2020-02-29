<template>
  <section class="hero is-primary">
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
              <router-link class="navbar-item" :to="{ name: child.name }" exact-active-class="is-active">{{$t(child.meta.title)}}</router-link>
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

    const title = route ? route.meta.title : '';
    const children = route && route.children ? route.children : [];

    return {
      title,
      children,
    }
  },
})
</script>
