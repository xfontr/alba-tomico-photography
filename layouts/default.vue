<script lang="ts" setup>
definePageMeta({ layout: "canvas" });
</script>

<template>
  <div class="main">
    <div id="teleports" />

    <header>
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
}
</style>
