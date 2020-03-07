<template>
  <b-navbar shadow type="is-white">
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ name: 'home' }">
        <span class="logo">
          COPA
          <b-tag type="is-danger">Alpha</b-tag>
        </span>
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item tag="router-link" :to="{ name: 'home' }">
        Home
      </b-navbar-item>
      <b-navbar-item tag="router-link" :to="{ name: 'privacy' }">
        Privacy
      </b-navbar-item>
    </template>
    <template slot="end">
    </template>
  </b-navbar>
</template>


<script lang="ts">
  import {defineComponent} from '@vue/composition-api'

  export default defineComponent({
    setup() {

    },
  })
</script>

<style lang="scss">
  @import 'src/styles/utilities/all';

  span.logo {
    font-family: 'Poppins';
    font-weight: bold;
    font-size: 32px;
    color: $black;
    align-items: center;
    display: flex;

    span.tag {
      margin-left: 8px;
    }
  }

  nav.navbar {
    padding-top: 8px;

    &:before {
      content: "";
      position: absolute;
      top: 0;
      height: 8px;
      width: 100%;
      background: linear-gradient(45deg, $dark, $light);
    }
  }

  a.navbar-item {
    font-family: 'Poppins';
    font-weight: bold;
    color: $black;
    padding-left: 15px;
    padding-right: 15px;
  }

  @include desktop() {
    .navbar-brand {
      margin-right: 30px;
    }
  }

</style>
