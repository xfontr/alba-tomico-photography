<script lang="ts" setup>
import { addBrackets } from "#imports";
import { MENU_ITEMS } from "~/configs/constants";

const { t } = useI18n();
</script>

<template>
  <nav class="navigation-menu">
    <FullMenu :menu-items="MENU_ITEMS">
      <button type="button" class="navigation-menu__item">
        {{ addBrackets(t("menu.menu") as string) }}
      </button></FullMenu
    >

    <NuxtLink to="/" class="navigation-menu__item">
      {{ addBrackets(t("meta.title") as string) }}
    </NuxtLink>

    <NuxtLink to="contact" class="navigation-menu__item">
      {{ addBrackets(t("menu.contact") as string) }}
    </NuxtLink>
  </nav>
</template>

<style lang="scss" scoped>
.navigation-menu {
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: $z-index-m;
  color: $color-primary;

  &__item {
    font-size: $font-size-m;
    cursor: pointer;
  }
}
</style>
