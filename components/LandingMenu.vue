<script lang="ts" setup>
import { MENU_ITEMS } from "~/configs/constants";
import type FullMenu from "./FullMenu.vue";

const { t } = useI18n();

const menu = ref<{ toggle: () => void }>();
</script>

<template>
  <slot />

  <FullMenu ref="menu" :items="MENU_ITEMS" />

  <nav class="landing-menu">
    <NuxtLink to="contact" class="landing-menu__item">
      {{ t("menu.contact_landing") }}
    </NuxtLink>

    <h1 class="landing-menu__heading">
      {{ t("meta.title") }}
    </h1>

    <button type="button" class="landing-menu__item" @click="menu!.toggle">
      {{ t("menu.menu_landing") }}
    </button>
  </nav>
</template>

<style lang="scss" scoped>
body[data-theme="invert"] .landing-menu {
  color: $color-secondary;
}

.landing-menu {
  border: 10px solid red;
  position: fixed;
  inset: 0;
  width: 100vw;
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
    font-weight: 900;
    text-align: center;
    font-size: $font-size-xl;

    @media (min-width: 500px) {
      font-size: $font-size-xxl;
    }
  }
}
</style>
