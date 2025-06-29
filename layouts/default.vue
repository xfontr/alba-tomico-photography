<script lang="ts" setup>
import { VueLenis } from "lenis/vue";
</script>

<template>
  <div class="main">
    <VueLenis root />

    <div id="teleports" />

    <header class="main__header">
      <NavigationMenu />
    </header>

    <main>
      <slot />
    </main>
  </div>
</template>

<style lang="scss" scoped>
.main {
  padding: $distances-m;

  &__header {
    margin-bottom: $distances-l;
  }
}
</style>
