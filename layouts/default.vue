<template>
  <div class="main">
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
body[data-theme="invert"] .main {
  color: $color-secondary;
  background-color: $color-primary;
}

.main {
  padding: $distances-m;

  &__header {
    margin-bottom: $distances-l;
  }
}
</style>
