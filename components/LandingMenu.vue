<script lang="ts" setup>
import { MENU_ITEMS } from "~/configs/constants";

const { t } = useI18n();
</script>

<template>
  <slot />

  <nav class="landing-menu">
    <NuxtLink to="contact" class="landing-menu__item">
      {{ t("menu.contact_landing") }}
    </NuxtLink>

    <h1 class="landing-menu__heading">
      {{ t("meta.title") }}
    </h1>

    <FullMenu :items="MENU_ITEMS">
      <button type="button" class="landing-menu__item">
        {{ t("menu.menu_landing") }}
      </button></FullMenu
    >
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
  z-index: $z-index-m;
  color: $color-primary;

  &__item {
    font-size: $font-size-m;
    cursor: pointer;
    transform: rotate(90deg);
  }

  &__heading {
    text-transform: uppercase;
    font-size: $font-size-xxl;
    font-weight: 900;
    text-align: center;
  }
}
</style>
