<template>
  <nav class="navbar" :class="{ 'is-dark': isDark }" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          <img
            v-if="!isDark"
            src="../../../assets/logo.png"
            alt="COPA: Tournament MGMT Tool"
            width="112"
            height="28"
          />
          <img
            v-if="isDark"
            src="../../../assets/logo-dark.png"
            alt="COPA: Tournament MGMT Tool"
            width="112"
            height="28"
          />
          <span class="tag is-danger" style="margin-left: 15px">BETA</span>
        </a>

        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component
  export default class Header extends Vue {
    @Prop({ default: false }) isDark!: boolean
  }
</script>
