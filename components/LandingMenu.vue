<script lang="ts" setup>
const { t } = useI18n();
</script>

<template>
  <slot />

  <nav class="landing-menu">
    <NuxtLink to="info" class="landing-menu__item landing-menu__item--left">
      {{ t("menu.info_landing") }}
    </NuxtLink>

    <h1 class="landing-menu__heading">
      {{ t("meta.title") }}
    </h1>

    <button type="button" class="landing-menu__item landing-menu__item--right">
      {{ t("menu.menu_landing") }}
    </button>
  </nav>
</template>

<style lang="scss" scoped>
.landing-menu {
  position: absolute;
  inset: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: all;

  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 2;
  color: white;

  &__item {
    font-size: $font-size-m;
    cursor: pointer;

    &--left {
      transform: rotate(90deg);
    }

    &--right {
      transform: rotate(-90deg);
    }
  }

  &__heading {
    text-transform: uppercase;
    font-size: $font-size-xl;
    font-weight: 900;
  }
}
</style>
